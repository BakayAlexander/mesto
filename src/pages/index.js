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
} from '../scripts/utils/constants.js';
import { Api } from '../scripts/components/Api';

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

// api.editProfile();
// const testCard = api.addNewCard({
//   name: 'Архыз',
//   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
// });
// console.log(testCard);

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
  // userInfo.setUserInfo(values);
  // console.log(values);
  // api.editProfile().then((res) => {
  //   userInfo.setUserInfo(values);
  // });
  api.editProfile(values.fullname, values.description).then((res) => {
    console.log(res.name);
    userInfo.setUserInfo({ fullname: res.name, description: res.about });
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
function generateCard(data, template) {
  const card = new Card(data, template, () => {
    //Описываем callback функцию для открытия popup с картинкой при клике на картинку
    popupWithImageClass.open(data);
  }).createCard();
  return card;
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
  const card = generateCard(item, elementTemplate);
  cardList.addItem(card);
});
popupFormCardClass.setEventListeners();

//Открытие popup формы добавления новой карточки
buttonOpenFormCard.addEventListener('click', function () {
  popupFormCardClass.open();
  formValidatorCard.resetValidation();
});
