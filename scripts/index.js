//Открытие и закрытие формы
//Объявление переменных и выборки

const popupElement = document.querySelector('.popup');

const popupFormEdit = document.querySelector('.popup_type_edit');
//Выборка кнопки закрытия
const popupCloseButtonElement = document.querySelector('.popup__button-close');
//Выборка кнопки открытия
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
//Выборка формы
let formProfile = popupElement.querySelector('.popup__form-edit');

//Выборка текстовых элементов
let nameElement = document.querySelector('.profile__name');
let descriptionElement = document.querySelector('.profile__description');

//Выборка элементов формы input
let nameInput = formProfile.querySelector('.popup__input_type_name');
let descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Функции
//Функция открытия popup
// const openPopup = () => {
//   popupElement.classList.add('popup_is-opened');
// };

const openPopup = (element) => {
  element.classList.add('popup_is-opened');
};



//Функция заполнения popup (для формы редактирования профиля)
const fillPopup = () => {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}

//Функция закрытия popup
const closePopup = () => {
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
// popupOpenButtonElement.addEventListener('click', openPopup);
popupOpenButtonElement.addEventListener('click', function(evt){
  openPopup(popupFormEdit);
  fillPopup(evt);
});


//Событие 'Закрытие popup'
popupCloseButtonElement.addEventListener('click', closePopup);

//Событие 'Закрытие popup при клике на пустую область'
popupElement.addEventListener('click', closePopupByClickOverlay);

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);



//5й спринт.----------------------------------------------------------------

//Добавление defaul-карточек(из коробки)

//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elemetTemplate = document.querySelector('.element-template').content;

//Функция наполнения карточки
function addCard (name, image) {
  //Достаем и копируем всю заготовку карточки
  const elementCard = elemetTemplate.querySelector('.element').cloneNode(true);

  //Вводим текст и картинку  
  elementCard.querySelector('.element__name').textContent = name;
  elementCard.querySelector('.element__pic').src = image;
  //Запускаем слушатели на события внутри карточек
  setListeners(elementCard);
  //Добавляем карточки
  // elementSection.prepend(elementCard);
  return elementCard
};

//Слушатели событий на элементы внутри карточки
function setListeners(element) {
  //слушатель на кнопку like
  element.querySelector('.element__like-button').addEventListener('click', handleLike)
  //слушатель на кнопку delete
  element.querySelector('.element__delete-button').addEventListener('click', handleCardDelete)
}

//Функция добавления лайка
function handleLike(evt){
  evt.target.classList.toggle('element__like-button_acive');
  //Более длинная запись с объявлением переменной и навешиванием непосредственно на нее переключателя
  // const eventTarget = evt.target;
  // eventTarget.classList.toggle('element__like-button_acive');
}
//Функция удаления карточки. Прописываем через closest чтобы удалять конкретную карточку
function handleCardDelete(evt){
  evt.target.closest('.element').remove();
}

//Массив default карточек
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

//Функция добавления карточек из массива
function renderCard () {
    initialCards.forEach((item) => {
      const elCard = addCard(item.name, item.image)
      elementSection.prepend(elCard);
    })
}

renderCard()

//Форма Card
//Выборка формы и кнопки
const popupFormCard = document.querySelector('.popup_type_card');
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close')
const popupFormCardOpenElement = document.querySelector('.profile__add-button')
const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Слушатель и открытие формы!! НАДО ПЕРЕПИСАТЬ В СОКРАЩЕННЫЙ ВАРИАНТ
popupFormCardOpenElement.addEventListener('click', function(){
  // popupFormCard.classList.add('popup_is-opened')
  openPopup(popupFormCard);
})

//Слушатель и закрытие формы!! НАДО ПЕРЕПИСАТЬ В СОКРАЩЕННЫЙ ВАРИАНТ
popupFormCardCloseElement.addEventListener('click', function(evt){
  popupFormCard.classList.remove('popup_is-opened')
});

//Слушать на событие "Создать"
popupFormCardSaveElement.addEventListener('click', function(evt){
  evt.preventDefault();
  const image = popupFormCard.querySelector('.popup__input_type_description');
  const name = popupFormCard.querySelector('.popup__input_type_name');
  const elCard = addCard(name.value, image.value);
  elementSection.prepend(elCard);
  //дописать функцию закрытия popup
  name.value = '';
  image.value = '';
})





