import './index.css';
import { initialCards } from '../scripts/utils/data.js';
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
profileData
  .then((data) => {
    userInfo.setUserInfo({ fullname: data.name, description: data.about, avatar: data.avatar });
  })
  .catch((err) => {
    alert(`Возникла ошибка: ${err}`);
  });

//Создаем новый класс для popup профиля
const popupFormProfile = new PopupWithForm(popupSelectorProfile, (values) => {
  //Передаем значения input в значения формы профиля
  api.editProfile(values.fullname, values.description).then((res) => {
    userInfo.setUserInfo({ fullname: res.name, description: res.about, avatar: res.avatar });
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

//Функция генерации карточки из класса Card

// function generateCard(data, template) {
//   const card = new Card(data, template, () => {
//     //Описываем callback функцию для открытия popup с картинкой при клике на картинку
//     popupWithImageClass.open(data);
//   }).createCard();
//   return card;
// }

function generateCard(data, template) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        //Описываем callback функцию для открытия popup с картинкой при клике на картинку
        popupWithImageClass.open(data);
      },
      handleLikeClickActive: () => {
        api
          .putCardLikes(data._id)
          .then((res) => {
            //Счетчик лайков!!!!!!!
            // console.log(res.likes.length);
            // const template = document.querySelector('.element__like-count');
            // template.textContent = res.likes.length;
            // console.log(template.textContent);
            card.countLikes(res.likes.length);
          })
          .finally(() => {});
      },
      handleLikeClickDeactive: () => {
        api.deleteCardLikes(data._id).then((res) => {
          // console.log(res);
          card.countLikes(res.likes.length);
        });
      },
      handleDeleteClick: () => {
        api.deleteCard(data._id).then(() => {
          card.handleDelete();
        });
      },
    },
    template
  );
  return card.createCard();
}

//Заполняем из API карточки
const cardsData = api.getCardsData();
cardsData.then((data) => {
  const cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const card = generateCard(item, elementTemplate);
        cardList.addItem(card);
      },
    },
    elementSection
  );
  //Запускаем дефолтное заполнение карточками.
  cardList.renderItems();
});

//Запускаем валидацию для формы добавления новой карточки
const formValidatorCard = new FormValidator(settings, formCard);
formValidatorCard.enableValidation();

//Создаем новый класс popup с формой добавления новой карточки и запускаем слушатели события для него
const popupFormCardClass = new PopupWithForm(popupFormCard, (item) => {
  //описываем callback функцию добавления новой карточки при submit
  api.addNewCard(item.name, item.image).then((res) => {});
  //!!!!!!!!!!!
  // const card = generateCard(item, elementTemplate);
  // cardList.addItem(card);
});
popupFormCardClass.setEventListeners();

//Открытие popup формы добавления новой карточки
buttonOpenFormCard.addEventListener('click', function () {
  popupFormCardClass.open();
  formValidatorCard.resetValidation();
});

//Запускаем валидацию для формы добавления новой карточки
const formValidatorAvatar = new FormValidator(settings, formAvatar);
formValidatorAvatar.enableValidation();

//Создаем новый класс для popup аватара
const popupFormAvatarClass = new PopupWithForm(popupFormAvatar, (values) => {
  api.editAvatar(values.link).then((res) => {
    userInfo.setUserInfo({ fullname: res.name, description: res.about, avatar: res.avatar });
  });
});

popupFormAvatarClass.setEventListeners();

//Открытие popup формы изменения аватара
buttonOpenFormAvatar.addEventListener('click', function () {
  popupFormAvatarClass.open();
});

// const deleteCardClass = new PopupWithSubmit(popupCardDelete);
// const buttonCardDelete = document.querySelector('.element__delete-button');
// buttonCardDelete.addEventListener('click', () => {
//   deleteCardClass.open();
// });

// const testInfo = userInfo.getUserInfo();
// console.log(testInfo);
