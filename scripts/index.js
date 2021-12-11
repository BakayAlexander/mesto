import { initialCards } from './utils/data.js';
import { Card } from './Card.js';
// import { openPopup, closePopup } from './utils/utils.js';
import { obj } from './utils/settings.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';

//Форма редактирования профиля
const popupSelectorProfile = document.querySelector('.popup_type_edit');
const popupSelectorProfile1 = '.popup_type_edit';
//Выборка кнопки закрытия
// const popupCloseButtonFormProfile = document.querySelector('.popup__button-close');
//Выборка кнопки открытия
const popupOpenButtonFormProfile = document.querySelector('.profile__edit-button');
//Выборка форм
const formProfile = document.forms['form-edit'];
const formCard = document.forms['form-card'];

//Выборка текстовых элементов
const nameElementFormProfile = document.querySelector('.profile__name');
const descriptionElementFormProfile = document.querySelector('.profile__description');

//Выборка input
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Выбираем весь popup
const popupPic = document.querySelector('.popup_type_pic');
//Выбираем кнопку закрытия
// const popupPicCardCloseButton = popupPic.querySelector('.popup__button-close');

//Создаем новый класс popup для профиля
const popupFormProfile = new Popup(popupSelectorProfile1);
//Событие 'Закрытие popup'
popupFormProfile.setEventListeners();

//Функция наполнения полей (нужна при открытии)
const fillPopup = () => {
  nameInput.value = nameElementFormProfile.textContent;
  descriptionInput.value = descriptionElementFormProfile.textContent;
};

//Запускаем валидацию
const formValidatorProfile = new FormValidator(obj, formProfile);
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
  //Закрываем форму
  popupFormProfile.close();
}

//Событие 'Открытие popup'
popupOpenButtonFormProfile.addEventListener('click', function () {
  popupFormProfile.open();
  fillPopup();
  formValidatorProfile.resetValidation();
});

//Событие 'Закрытие popup'
// popupCloseButtonFormProfile.addEventListener('click', () => {
//   popupFormProfile.close();
// });

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);

//Наполнение дефолтными карточками
//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elementTemplate = document.querySelector('.element-template');

const popupWithImageClass = new PopupWithImage('.popup_type_pic');
popupWithImageClass.setEventListeners();

//Функция генерации карточки из класса Card
function generateCard(data, template) {
  //!!!!!!! Эти константы черт знает что
  const name = data.name;
  const image = data.image;
  const card = new Card(data, template, {
    handleCardClick: (data) => {
      popupWithImageClass.open({ name, image });
    },
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

//Функция добавления карточек на страницу
// function renderCard() {
//   initialCards.forEach((item) => {
//     elementSection.prepend(generateCard(item, elementTemplate));
//   });
// }
// renderCard();

//Popup форма Card
//Выборка формы и кнопок с ней связанных
const popupFormCard = document.querySelector('.popup_type_card');
//!!!!!!!!!!!!!!!!
const popupFormCard1 = '.popup_type_card';

//Или вариант выборки формы:
const popupFormCardOpenElement = document.querySelector('.profile__add-button');
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close');
const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Создаем новый класс popup для формы добавления карточек
const popupFormCardClass = new Popup(popupFormCard1);

//Запускаем валидацию
const formValidatorCard = new FormValidator(obj, formCard);
formValidatorCard.enableValidation();

//Слушатель на открытие
popupFormCardOpenElement.addEventListener('click', function () {
  // openPopup(popupFormCard);
  popupFormCardClass.open();
  formValidatorCard.resetValidation();
  formValidatorCard.resetInputs();
});

//Слушатель на закрытие
popupFormCardCloseElement.addEventListener('click', function () {
  popupFormCardClass.close();
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
  // closePopup(popupFormCard);
  popupFormCardClass.close();
  //Деактивируем кнопку (Создать)
  popupFormCardSaveElement.disabled = true;
  popupFormCardSaveElement.classList.add('popup__button-save_disabled');
});

//Popup  с картинкой

//Слушатель на закрытие
// popupPicCardCloseButton.addEventListener('click', function () {
//   closePopup(popupPic);
// });
