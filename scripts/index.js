import {initialCards} from './data.js'
import {Card} from './Card.js'
import {openPopup, closePopup} from "./utils.js";
import {obj} from './settings.js'
import {FormValidator, resetInputErrors, resetInputs} from './FormValidator.js'

//Форма редактирования профиля
const popupFormProfile = document.querySelector('.popup_type_edit');
//Выборка кнопки закрытия
const popupCloseButtonFormProfile = document.querySelector('.popup__button-close');
//Выборка кнопки открытия
const popupOpenButtonFormProfile = document.querySelector('.profile__edit-button');
//Выборка кнопки сохранения
const popupSaveButtonFormProfile = popupFormProfile.querySelector('.popup__button-save');
//Выборка формы
// const formProfile = popupFormProfile.querySelector('.popup__form');
const formProfile = document.forms['form-edit']

//Выборка текстовых элементов
const nameElementFormProfile = document.querySelector('.profile__name');
const descriptionElementFormProfile = document.querySelector('.profile__description');

//Выборка элементов формы input
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Функция заполнения popup (для формы редактирования профиля)
const fillPopup = () => {
  nameInput.value = nameElementFormProfile.textContent;
  descriptionInput.value = descriptionElementFormProfile.textContent;
};

//Функция заполнения по кнопке "Сохранить" для формы редактирования профиля
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
  //При сохарении формы деактивируем кнопку "Сохранить"
  popupSaveButtonFormProfile.disabled = true;
  popupSaveButtonFormProfile.classList.add('popup__button-save_disabled')
}

//События для формы редактирования профиля
//Событие 'Открытие popup'
popupOpenButtonFormProfile.addEventListener('click', function () {
  openPopup(popupFormProfile);
  fillPopup();
  const formValidatorProfile = new FormValidator(obj, popupFormProfile)
  formValidatorProfile.enableValidation();
  resetInputErrors(popupFormProfile);
});

//Событие 'Закрытие popup'
popupCloseButtonFormProfile.addEventListener('click', function () {
  closePopup(popupFormProfile);
});

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);


// Реализуем наполнение карточек
//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elementTemplate = document.querySelector('.element-template');

//Функция добавления карточек на страницу
function renderCard() {
  initialCards.forEach((item) => {
    const elCard = new Card(item, elementTemplate)
    elementSection.prepend(elCard.createCard());
  });
}
//Запускаем дефолтное заполнение карточками.
renderCard();

//Popup форма Card
//Выборка формы и кнопок с ней связанных
const popupFormCard = document.querySelector('.popup_type_card');
//Или вариант выборки формы:
// const popupFormCard = document.forms['form-card']
const popupFormCardOpenElement = document.querySelector('.profile__add-button');
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close');
const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Слушатель и открытие формы
popupFormCardOpenElement.addEventListener('click', function () {
  openPopup(popupFormCard);
  resetInputErrors(popupFormCard);
  resetInputs(popupFormCard);
});

//Слушатель и закрытие формы
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
  }
  const elCard = new Card(item, elementTemplate)
  //Создаем переменную внутрь которой передаем функцию с входными параметрами значений(value) инпутов
  // const elCard = createCard(name.value, image.value);
  //Добавляем переменную в контейнер section
  elementSection.prepend(elCard.createCard());
  //Обнуляем значения инпутов, дабы при открытии они не сохранялись
  name.value = '';
  image.value = '';
  //Закрываем форму после нажатия кнопки (Создать)
  closePopup(popupFormCard);
  //Деактивируем кнопку (Создать)
  popupFormCardSaveElement.disabled = true;
  popupFormCardSaveElement.classList.add('popup__button-save_disabled')
});

//Popup  с картинкой
//Выбираем весь popup
const popupPic = document.querySelector('.popup_type_pic');
//Выбираем кнопку закрытия
const popupPicCardCloseButton = popupPic.querySelector('.popup__button-close');

//Описываем логику открытия popup с картинкой
function handlePopupPic(element) {
  //запускаем функцию открытия popup и на вход передаем весь popup
  openPopup(popupPic);
  //Выборка элементов картинки и заголовка
  const elementPic = element.querySelector('.element__pic');
  const elementTitle = element.querySelector('.element__name');
  //Выборка popup элементов картинки и заголовка
  const popupElementTitle = popupPic.querySelector('.popup__title-pic');
  const popupElementPic = popupPic.querySelector('.popup__pic');
  //Значению заголовка popup присваиваем значение заголовка элемента
  popupElementTitle.textContent = elementTitle.textContent;
  //Значению источника картинки popup присваиваем значение источника элемента
  popupElementPic.src = elementPic.src;
  popupElementPic.alt = elementPic.alt;
}

//Слушатель и закрытие карточки
popupPicCardCloseButton.addEventListener('click', function () {
  closePopup(popupPic);
});
