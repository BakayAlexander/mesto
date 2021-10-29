//Открытие и закрытие формы
//Объявление переменных и выборки

const popupElement = document.querySelector('.popup');

//Выборка формы редактиврования профиля
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
const openPopup = (element) => {
  //переменной element будет присвоен класс открытия popup
  element.classList.add('popup_is-opened');
};

//Функция закрытия popup
const closePopup = (element) => {
  element.classList.remove('popup_is-opened');
};

//Функция заполнения popup (для формы редактирования профиля)
const fillPopup = () => {
  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}


//Функция закрытия popup при клике на пустую область
const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};


//Функция заполнения формы по кнопке "Сохранить"
function formSubmitHandler(evt) {
  //отменяет дефолтное поведение. Страница не перезагружается после отправки формы
  evt.preventDefault();
  //Вытаскиваем текущие значения input
  let nameInputValue = nameInput.value;
  let descriptionInputValue = descriptionInput.value;
  //Вставляем текущие значения input в textContent html элементов
  nameElement.textContent = nameInputValue;
  descriptionElement.textContent = descriptionInputValue;
  //Закрываем форму. Вызываем функцию и на вход передаем элемент, которому будет добавлен еще один класс
  closePopup(popupFormEdit);
}

//События
//Событие 'Открытие popup'
// popupOpenButtonElement.addEventListener('click', openPopup);
popupOpenButtonElement.addEventListener('click', function(){
  openPopup(popupFormEdit);
  fillPopup();
});

//Событие 'Закрытие popup'
popupCloseButtonElement.addEventListener('click', function(){
  closePopup(popupFormEdit);
});

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);

//Событие 'Закрытие popup при клике на пустую область'
popupElement.addEventListener('click', closePopupByClickOverlay);




//5й спринт.----------------------------------------------------------------

//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elemetTemplate = document.querySelector('.element-template').content;

//Функция наполнения карточки
function addCard (name, image) {
  //Достаем и копируем всю заготовку карточки. Делаем локально, поскольку если глобально, цикл будет прогонять ее как новую при каждой итерации.
  const elementCard = elemetTemplate.querySelector('.element').cloneNode(true);
  //Вводим текст и картинку  
  elementCard.querySelector('.element__name').textContent = name;
  elementCard.querySelector('.element__pic').src = image;
  //Запускаем слушатели на события внутри карточек
  setListeners(elementCard);
  //Результатом действия функции будет возврат заполненной карточки elementCard(.element)
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
      //Обозначаем переменную с произвольным названием и в нее записываем 
      //функцию с входящими параметрами, которые вытаскиеваем из массива 
      //обращением через точку. item - каждый элемент массива
      const elCard = addCard(item.name, item.image)
      //Добавляем эту переменную в секцию карточек
      elementSection.prepend(elCard);
    })
}
//Запускаем дефолтное заполнение карточками.
renderCard()

//Форма Card
//Выборка формы и кнопок с ней связанных
const popupFormCard = document.querySelector('.popup_type_card');
const popupFormCardOpenElement = document.querySelector('.profile__add-button')
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close')
const popupFormCardSaveElement = popupFormCard.querySelector('.popup__button-save');

//Слушатель и открытие формы
popupFormCardOpenElement.addEventListener('click', function(){
  openPopup(popupFormCard);
})

//Слушатель и закрытие формы
popupFormCardCloseElement.addEventListener('click', function(){
  closePopup(popupFormCard);
});

//Слушать на событие "Создать"
popupFormCardSaveElement.addEventListener('click', function(evt){
  evt.preventDefault();
  //Достаем значения инпутов внутри функции
  const image = popupFormCard.querySelector('.popup__input_type_description');
  const name = popupFormCard.querySelector('.popup__input_type_name');
  //Создаем переменную внутрь которой передаем функцию с входными параметрами значений(value) инпутов
  const elCard = addCard(name.value, image.value);
  //Добавляем переменную в контейнер section
  elementSection.prepend(elCard);
  //Обнуляем значения инпутов, дабы при открытии они не сохранялись
  name.value = '';
  image.value = '';
  //Закрываем форму после нажатия кнопки (Создать)
  closePopup(popupFormCard);
})



