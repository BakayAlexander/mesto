import { initialCards } from './utils/data.js';
import { Card } from './components/Card.js';
import { obj } from './utils/settings.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

//Выборка popup редактирования профиля
const popupSelectorProfile = '.popup_type_edit';
//Выборка кнопки открытия popup профиля
const buttonOpenProfile = document.querySelector('.profile__edit-button');

//Выборка форм
const formProfile = document.forms['form-edit'];
const formCard = document.forms['form-card'];

//Выборка текстовых элементов профиля
const nameElementFormProfile = '.profile__name';
const descriptionElementFormProfile = '.profile__description';

//Выборка input формы профиля
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Выборка секции element
const elementSection = document.querySelector('.elements');

//Выборка template-шаблона
const elementTemplate = document.querySelector('.element-template');

//Выборка popup добавления карточки
const popupFormCard = '.popup_type_card';
//Выборка кнопки открытия popup добавления карточки
const buttonOpenFormCard = document.querySelector('.profile__add-button');

//Создаем новый класс для профиля пользователя, будем использовать его методы для заполнения текстовых полей
const userInfo = new UserInfo({ name: nameElementFormProfile, description: descriptionElementFormProfile });

//Создаем новый класс для popup профиля
const popupFormProfile = new PopupWithForm(popupSelectorProfile, () => {
  userInfo.setUserInfo(nameInput.value, descriptionInput.value);
});
//Запускаем метод слушателей событий. Он реагирует на закрытие формы и ее submit.
popupFormProfile.setEventListeners();

//Запускаем валидацию формы профиля
const formValidatorProfile = new FormValidator(obj, formProfile);
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

//Наполнение дефолтными карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCard(item, elementTemplate);
      cardList.addItem(card);
    },
  },
  elementSection
);
//Запускаем дефолтное заполнение карточками.
cardList.renderItems();

//Запускаем валидацию для формы добавления новой карточки
const formValidatorCard = new FormValidator(obj, formCard);
formValidatorCard.enableValidation();

//Создаем новый класс popup с формой добавления новой карточки и запускаем слушатели события для него
const PopupWithFormClass = new PopupWithForm(popupFormCard, (item) => {
  //описываем callback функцию добавления новой карточки при submit
  elementSection.prepend(generateCard(item, elementTemplate));
});
PopupWithFormClass.setEventListeners();

//Открытие popup формы добавления новой карточки
buttonOpenFormCard.addEventListener('click', function () {
  PopupWithFormClass.open();
  formValidatorCard.resetValidation();
});
