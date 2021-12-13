import { initialCards } from './utils/data.js';
import { Card } from './Card.js';
import { obj } from './utils/settings.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

//Форма редактирования профиля
const popupSelectorProfile1 = '.popup_type_edit';
//Выборка кнопки открытия попапа профиля
const popupOpenButtonFormProfile = document.querySelector('.profile__edit-button');
//Выборка форм
const formProfile = document.forms['form-edit'];
const formCard = document.forms['form-card'];

const nameElementFormProfile = '.profile__name';
const descriptionElementFormProfile = '.profile__description';

const userInfo = new UserInfo({ name: nameElementFormProfile, description: descriptionElementFormProfile });

//Выборка input профиля
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Выбираем весь popup
const popupPic = document.querySelector('.popup_type_pic');

//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elementTemplate = document.querySelector('.element-template');

//Создаем новый класс popup для профиля
const popupFormProfile = new Popup(popupSelectorProfile1);
// const popupFormProfile = new PopupWithForm(popupSelectorProfile1, submiter)
popupFormProfile.setEventListeners();

// const userInfo = new UserInfo({ nameElementFormProfile, descriptionElementFormProfile });

//Функция наполнения полей (нужна при открытии)
// const fillPopup = () => {
//   nameInput.value = nameElementFormProfile.textContent;
//   descriptionInput.value = descriptionElementFormProfile.textContent;
// };

//Запускаем валидацию
const formValidatorProfile = new FormValidator(obj, formProfile);
formValidatorProfile.enableValidation();

//Функция заполнения
function formSubmitHandler(evt) {
  //отменяет дефолтное поведение. Страница не перезагружается после отправки формы
  evt.preventDefault();
  userInfo.setUserInfo(nameInput.value, descriptionInput.value);
  //Вытаскиваем текущие значения input
  // const nameInputValue = nameInput.value;
  // const descriptionInputValue = descriptionInput.value;
  //Вставляем текущие значения input в textContent html элементов
  // nameElementFormProfile.textContent = nameInputValue;
  // descriptionElementFormProfile.textContent = descriptionInputValue;
  //Закрываем форму
  popupFormProfile.close();
}

//Событие 'Открытие popup'
popupOpenButtonFormProfile.addEventListener('click', function () {
  popupFormProfile.open();
  // fillPopup();
  const formElements = userInfo.getUserInfo();
  nameInput.value = formElements.name;
  descriptionInput.value = formElements.description;
  formValidatorProfile.resetValidation();
});

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);

//Наполнение дефолтными карточками
const popupWithImageClass = new PopupWithImage('.popup_type_pic');
popupWithImageClass.setEventListeners();

//Функция генерации карточки из класса Card
function generateCard(data, template) {
  const card = new Card(data, template, () => {
    popupWithImageClass.open(data);
  }).createCard();
  return card;
}

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

const popupFormCard = '.popup_type_card';

//Или вариант выборки формы:
const popupFormCardOpenElement = document.querySelector('.profile__add-button');
// const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close');
// const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Создаем новый класс popup для формы добавления карточек
// const popupFormCardClass = new Popup(popupFormCard);

// popupFormCardClass.setEventListeners();

//Запускаем валидацию
const formValidatorCard = new FormValidator(obj, formCard);
formValidatorCard.enableValidation();

const PopupWithFormClass = new PopupWithForm(popupFormCard, (item) => {
  elementSection.prepend(generateCard(item, elementTemplate));
});

PopupWithFormClass.setEventListeners();

//Слушатель на открытие
popupFormCardOpenElement.addEventListener('click', function () {
  PopupWithFormClass.open();
  formValidatorCard.resetValidation();
});

//Выборка текстовых элементов профиля
// const nameElementFormProfile = document.querySelector('.profile__name');
// const descriptionElementFormProfile = document.querySelector('.profile__description');
