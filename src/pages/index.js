import './index.css';
import { Card } from '../scripts/components/Card.js';
import { settings } from '../scripts/utils/settings.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import {
  popupSelectorProfile,
  buttonOpenProfile,
  formProfile,
  formCard,
  nameElementFormProfile,
  descriptionElementFormProfile,
  nameInput,
  descriptionInput,
  elementSection,
  elementTemplate,
  popupFormCard,
  buttonOpenFormCard,
  picElementFormProfile,
  popupFormAvatar,
  buttonOpenFormAvatar,
  formAvatar,
  popupCardDelete,
} from '../scripts/utils/constants.js';
import { Api } from '../scripts/components/Api';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit';
import { renderLoading } from '../scripts/utils/utils.js';

//В эту переменную позже запишется id пользователя
let userId;

//Создаем новый класс для профиля пользователя, будем использовать его методы для заполнения текстовых полей
const userInfo = new UserInfo({
  name: nameElementFormProfile,
  description: descriptionElementFormProfile,
  avatar: picElementFormProfile,
});

//API
const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-33/',
  headers: {
    authorization: '4ceab365-cfce-44b4-ad76-98caf2999b9a',
    'content-type': 'application/json',
  },
});

//Подгружаем из API данные пользователя
const profileData = api.getProfileData();

//Подгружаем из API данные карточки
const cardsData = api.getCardsData();

//Заполним профиль пользователя данными пришедшими из API
profileData
  .then((data) => {
    userInfo.setUserInfo({ fullname: data.name, description: data.about, avatar: data.avatar });
    //Записываем в переменную id пользователя (альтернативный метод)
    // userId = data._id;
  })
  .catch((err) => {
    alert(`Возникла ошибка: ${err}`);
  });

//Создаем новый класс для popup профиля
const popupFormProfile = new PopupWithForm(popupSelectorProfile, (values) => {
  //Описываем что будет происходить при submit формы, это сабмитер/хендлер
  //Для начала в кнопке сохранения меняем текст на "Загрузка..."
  renderLoading(popupSelectorProfile, true);
  //Передаем значения input в API запрос patch и после этого обновляем информацию на странице
  api
    .editProfile(values.fullname, values.description)
    .then((res) => {
      userInfo.setUserInfo({ fullname: res.name, description: res.about, avatar: res.avatar });
    })
    .catch((err) => {
      alert(`Возникла ошибка: ${err}`);
    })
    .finally(() => {
      //В любом случае возвращаем текст сохранения к стандартному состоянию
      renderLoading(popupSelectorProfile, false);
    });
});

//Запускаем метод слушателей событий. Он реагирует на закрытие формы и ее submit.
popupFormProfile.setEventListeners();

//Запускаем валидацию формы профиля
const formValidatorProfile = new FormValidator(settings, formProfile);
formValidatorProfile.enableValidation();

//Открытие popup профиля
buttonOpenProfile.addEventListener('click', function () {
  //Вызываем метод открытия формы
  popupFormProfile.open();
  //Вызываем метод получения объекта с текстовыми значениями профиля
  const formTextElements = userInfo.getUserInfo();
  //Присваиваем значениям инпутов текущие данные профиля
  nameInput.value = formTextElements.name;
  descriptionInput.value = formTextElements.description;
  //Перезагружаем ошибки и кнопку сохранения
  formValidatorProfile.resetValidation();
});

//Создаем новый класс popup с картинкой и запускаем слушатели события для него
const popupWithImageClass = new PopupWithImage('.popup_type_pic');
popupWithImageClass.setEventListeners();

//Создаем новый класс popup с submit (для удаления карточки)
const popupWithSubmitClass = new PopupWithSubmit(popupCardDelete);
popupWithSubmitClass.setEventListeners();

//Функция генерации карточки из класса Card
function generateCard(data, template) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        //Описываем callback функцию для открытия popup с картинкой при клике на картинку
        popupWithImageClass.open(data);
      },
      handleLikeClickActive: () => {
        //Описываем callback функцию постановки лайков. Вначале отправляем API запрос на установку лайка, потом отправляем API запрос на пересчет лайков
        api
          .putCardLikes(data._id)
          .then((res) => {
            card.countLikes(res.likes.length);
          })
          .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
          });
      },
      handleLikeClickDeactive: () => {
        //Описываем callback функцию снятия лайков.
        api
          .deleteCardLikes(data._id)
          .then((res) => {
            card.countLikes(res.likes.length);
          })
          .catch((err) => {
            alert(`Возникла ошибка: ${err}`);
          });
      },
      handleDeleteClick: () => {
        //Описываем callback функцию удаления карточки. Вначале открываем форму подтверджения удаления и затем динамически определяем, что будет происходить при ее submit.
        popupWithSubmitClass.open();
        popupWithSubmitClass.submit(() => {
          //удаляя карточку посылаем запрос на сервер и в случае положительного ответа удаляем из разметки
          api
            .deleteCard(data._id)
            .then(() => {
              card.handleDelete();
            })
            .catch((err) => {
              alert(`Возникла ошибка: ${err}`);
            });
        });
      },
    },
    template,
    userId
  );
  return card.createCard();
}

//Записываем в переменную id пользователя (для того чтобы определить like на карточках и принадлежность карточек). Получаем id и только потом можем выгрузить карточки из API и отрисовать их на странице.
Promise.all([cardsData, profileData]).then((res) => {
  userId = res[1]._id;
  //Заполняем из API карточки
  cardsData
    .then((data) => {
      const cardList = new Section(
        {
          items: data,
          renderer: (item) => {
            //При создании карточки передаем не только массив данных и селектор шаблона, но и id пользователя ее создавшего
            const card = generateCard(item, elementTemplate, userId);
            cardList.addItem(card);
          },
        },
        elementSection
      );

      //Запускаем дефолтное заполнение карточками.
      cardList.renderItems();
    })
    .catch((err) => {
      alert(`Возникла ошибка: ${err}`);
    });
});

//Запускаем валидацию для формы добавления новой карточки
const formValidatorCard = new FormValidator(settings, formCard);
formValidatorCard.enableValidation();

//Создаем новый класс popup с формой добавления новой карточки и запускаем слушатели события для него
const popupFormCardClass = new PopupWithForm(popupFormCard, (item) => {
  //описываем callback функцию добавления новой карточки при submit
  //Для начала в кнопке сохранения меняем текст на "Загрузка..."
  renderLoading(popupFormCard, true);
  api
    .addNewCard(item.name, item.link)
    .then((res) => {
      const card = generateCard(res, elementTemplate);
      elementSection.append(card);
    })
    .catch((err) => {
      alert(`Возникла ошибка: ${err}`);
    })
    .finally(() => {
      //В любом случае возвращаем текст сохранения к стандартному состоянию
      renderLoading(popupFormCard, false);
    });
});
popupFormCardClass.setEventListeners();

//Открытие popup формы добавления новой карточки
buttonOpenFormCard.addEventListener('click', function () {
  popupFormCardClass.open();
  //Очищаем ошибки инпутов и деактивируем кнопку сохранения
  formValidatorCard.resetValidation();
});

//Запускаем валидацию для формы добавления новой карточки
const formValidatorAvatar = new FormValidator(settings, formAvatar);
formValidatorAvatar.enableValidation();

//Создаем новый класс для popup аватара
const popupFormAvatarClass = new PopupWithForm(popupFormAvatar, (values) => {
  //Для начала в кнопке сохранения меняем текст на "Загрузка..."
  renderLoading(popupFormAvatar, true);
  //Посылаем запрос на замену аватара и затем меняем его непосредственно на нашей страничке
  api
    .editAvatar(values.link)
    .then((res) => {
      userInfo.setUserInfo({ fullname: res.name, description: res.about, avatar: res.avatar });
    })
    .catch((err) => {
      alert(`Возникла ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(popupFormAvatar, false);
    });
});

popupFormAvatarClass.setEventListeners();

//Открытие popup формы изменения аватара
buttonOpenFormAvatar.addEventListener('click', function () {
  //Перезапустим валидацию для очистки ошибок и деактивации кнопки
  formValidatorAvatar.resetValidation();
  popupFormAvatarClass.open();
});
