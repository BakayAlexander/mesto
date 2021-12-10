import { initialCards } from './utils/data.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils/utils.js';
import { obj } from './utils/settings.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

//Форма редактирования профиля
const popupFormProfile = document.querySelector('.popup_type_edit');
//Выборка кнопки закрытия
const popupCloseButtonFormProfile = document.querySelector('.popup__button-close');
//Выборка кнопки открытия
const popupOpenButtonFormProfile = document.querySelector('.profile__edit-button');
//Выборка формы
const formProfile = document.forms['form-edit'];

//Выборка текстовых элементов
const nameElementFormProfile = document.querySelector('.profile__name');
const descriptionElementFormProfile = document.querySelector('.profile__description');

//Выборка input
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Функция наполнения полей (нужна при открытии)
const fillPopup = () => {
  nameInput.value = nameElementFormProfile.textContent;
  descriptionInput.value = descriptionElementFormProfile.textContent;
};

//Запускаем валидацию
const formValidatorProfile = new FormValidator(obj, popupFormProfile);
formValidatorProfile.enableValidation();

//Функция заполнения
function formSubmitHandler(evt) {
  //отменяет дефолтное поведение. Страница не перезагружается после отправки формы
  evt.preventDefault();
  //Вытаскиваем текущие значения input
  const nameInputValue = nameInput.value;
  const descriptionInputValue = descriptionInput.value;
  //Вставляем текущие значения input в textContent html элементов
  nameElementFormProfile.textContent = nameInputValue;
  descriptionElementFormProfile.textContent = descriptionInputValue;
  //Закрываем форму. Вызываем функцию и на вход передаем элемент, которому будет добавлен еще один класс
  closePopup(popupFormProfile);
}

//Событие 'Открытие popup'
popupOpenButtonFormProfile.addEventListener('click', function () {
  openPopup(popupFormProfile);
  fillPopup();
  formValidatorProfile.resetValidation();
});

//Событие 'Закрытие popup'
popupCloseButtonFormProfile.addEventListener('click', function () {
  closePopup(popupFormProfile);
});

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);

//Наполнение дефолтными карточками
//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elementTemplate = document.querySelector('.element-template');

//Функция генерации карточки из класса Card
function generateCard(data, template) {
  const card = new Card(data, template);
  return card.createCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, elementTemplate);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  elementSection
);

cardList.renderItems();

//Функция добавления карточек на страницу
// function renderCard() {
//   initialCards.forEach((item) => {
//     elementSection.prepend(generateCard(item, elementTemplate));
//   });
// }
//Запускаем дефолтное заполнение карточками.
// renderCard();

//Popup форма Card
//Выборка формы и кнопок с ней связанных
const popupFormCard = document.querySelector('.popup_type_card');
//Или вариант выборки формы:
// const popupFormCard = document.forms['form-card']
const popupFormCardOpenElement = document.querySelector('.profile__add-button');
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close');
const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Запускаем валидацию
const formValidatorCard = new FormValidator(obj, popupFormCard);
formValidatorCard.enableValidation();

//Слушатель на открытие
popupFormCardOpenElement.addEventListener('click', function () {
  openPopup(popupFormCard);
  formValidatorCard.resetValidation();
  formValidatorCard.resetInputs();
});

//Слушатель на закрытие
popupFormCardCloseElement.addEventListener('click', function () {
  closePopup(popupFormCard);
});

//Слушать на событие "Создать"
popupFormCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  //Достаем значения инпутов внутри функции
  const image = popupFormCard.querySelector('.popup__input_type_image-url');
  const name = popupFormCard.querySelector('.popup__input_type_image-name');
  const item = {
    name: name.value,
    image: image.value,
  };
  elementSection.prepend(generateCard(item, elementTemplate));
  //Обнуляем значения инпутов, дабы при открытии они не сохранялись
  name.value = '';
  image.value = '';
  //Закрываем форму после нажатия кнопки (Создать)
  closePopup(popupFormCard);
  //Деактивируем кнопку (Создать)
  popupFormCardSaveElement.disabled = true;
  popupFormCardSaveElement.classList.add('popup__button-save_disabled');
});

//Popup  с картинкой

//Выбираем весь popup
const popupPic = document.querySelector('.popup_type_pic');
//Выбираем кнопку закрытия
const popupPicCardCloseButton = popupPic.querySelector('.popup__button-close');

//Слушатель на закрытие
popupPicCardCloseButton.addEventListener('click', function () {
  closePopup(popupPic);
});
