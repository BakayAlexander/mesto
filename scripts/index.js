//Открытие и закрытие формы
//Объявление переменных и выборки

//Выборка кнопки закрытия
const popupElement = document.querySelector('.popup_type_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');

//Выборка кнопки открытия
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

//------------------------------------

//ФОРМА. Объявление переменных и выборки
//Выборка формы
let formElement = popupElement.querySelector('.popup__form-edit');

//Выборка текстовых элементов
let nameElement = document.querySelector('.profile__name');
let descriptionElement = document.querySelector('.profile__description');

//Выборка элементов формы input
let nameInput = formElement.querySelector('.popup__input_type_name');
let descriptionInput = formElement.querySelector('.popup__input_type_description');

//Функции

//Функция открытия popup
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  //Записываем текущие данные с сайта в input
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
};

//Функция закрытия popup
const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

//Функция закрытия popup при клике на пустую область
const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//Функция заполнения формы по кнопке "Сохранить"
function formSubmitHandler(evt) {
  evt.preventDefault();
  //Вытаскиваем текущие значения input
  let nameInputValue = nameInput.value;
  let descriptionInputValue = descriptionInput.value;
  //Вставляем текущие значения input в textContent html элементов
  nameElement.textContent = nameInputValue;
  descriptionElement.textContent = descriptionInputValue;
  closePopup();
}

//События
//Событие 'Открытие popup'
popupOpenButtonElement.addEventListener('click', openPopup);

//Событие 'Закрытие popup'
popupCloseButtonElement.addEventListener('click', closePopup);

//Событие 'Закрытие popup при клике на пустую область'
popupElement.addEventListener('click', closePopupByClickOverlay);

//Событие 'Клик по кнопке Сохранить'
formElement.addEventListener('submit', formSubmitHandler);



//5й спринт.----------------------------------------------------------------

//Добавление defaul-карточек(из коробки)

//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elemetTemplate = document.querySelector('#element-template').content;

//Функция наполнения карточки
const addCard = (name, image) => {
  //Достаем и копируем всю заготовку карточки
  const elementCard = elemetTemplate.querySelector('.element').cloneNode(true);
    
  elementCard.querySelector('.element__name').textContent = name;
  elementCard.querySelector('.element__pic').src = image;
  
  //прописать слушатели на удалениe like и превью
  elementCard.querySelector('.element__like-button').addEventListener('click', function(evt){
    const eventTarget = evt.target;
    //add работает, а вот toggle не работает при объявлении глобальных перменных
    eventTarget.classList.toggle('element__like-button_acive')
  })
  elementSection.prepend(elementCard);
};



// addCard("Jane", "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg");

//Реализуем добавление default карточек
const initialCards = [
  {
    name: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район', 
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function renderCard () {
    initialCards.forEach((item) => {
        addCard(item.name, item.image)
    })
}
renderCard()

//Форма Card
//Общий попап для пробы toggle
const popupMain = document.querySelector('.popup')

const popupCard = document.querySelector('.popup_type_card');
const popupOpenButtonCard = document.querySelector('.profile__add-button');
const popupCloseButtonCard = popupCard.querySelector('.popup__button-close');

const togglePopup = function (evt) {
    const eventTarget = evt.target;
    popupMain.classList.toggle('popup_is-opened')
}

popupOpenButtonCard.addEventListener('click', togglePopup)






