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

//Выборка формы редактиврования профиля
const popupFormProfile = document.querySelector('.popup_type_edit');
//Выборка кнопки закрытия
const popupCloseButtonFormProfile = document.querySelector('.popup__button-close');
//Выборка кнопки открытия
const popupOpenButtonFormProfile = document.querySelector('.profile__edit-button');

//Форма редактирования профиля
//Выборка формы
const formProfile = popupFormProfile.querySelector('.popup__form');

//Выборка текстовых элементов
const nameElementFormProfile = document.querySelector('.profile__name');
const descriptionElementFormProfile = document.querySelector('.profile__description');

//Выборка элементов формы input
const nameInput = formProfile.querySelector('.popup__input_type_name');
const descriptionInput = formProfile.querySelector('.popup__input_type_description');

//Функции
//Функция открытия popup
const openPopup = (element) => {
  //переменной element будет присвоен класс открытия popup, он меняет visibility
  element.classList.add('popup_is-opened');
  const inputList = [...element.querySelectorAll('.popup__input')];
  const errorList = [...element.querySelectorAll('.popup__input-error')];
  inputList.forEach((inputElement) =>{
    inputElement.classList.remove('popup__input_type_error');
  })
  errorList.forEach((errorElement) => {
    errorElement.classList.remove('.popup__input-error_activate');
    errorElement.textContent = '';
  })
};

//Функция закрытия popup
const closePopup = (element) => {
  element.classList.remove('popup_is-opened');
};

//Функция заполнения popup (для формы редактирования профиля)
const fillPopup = () => {
  nameInput.value = nameElementFormProfile.textContent;
  descriptionInput.value = descriptionElementFormProfile.textContent;
}


//Функция закрытия popup при клике на пустую область
//хочу передавать element внутрь closePopup, но пока не могу реализовать
// const closePopupByClickOverlay = function (event) {
//   console.log(`event.target`, event.target)
//   console.log(`popupElement`, popupElement)
//   if (event.target === popupElement) {
//     closePopup(popupElement);
//   }
// };

//Функция заполнения формы по кнопке "Сохранить"
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

//События
//Событие 'Открытие popup'
// popupOpenButtonFormProfile.addEventListener('click', openPopup);
popupOpenButtonFormProfile.addEventListener('click', function(){
  openPopup(popupFormProfile);
  fillPopup();
});

//Событие 'Закрытие popup'
popupCloseButtonFormProfile.addEventListener('click', function(){
  closePopup(popupFormProfile);
});

//Событие 'Клик по кнопке Сохранить'
formProfile.addEventListener('submit', formSubmitHandler);

//Событие 'Закрытие popup при клике на пустую область'
// popupFormProfile.addEventListener('click', closePopupByClickOverlay);




//5й спринт.----------------------------------------------------------------

//Достаем секцию element
const elementSection = document.querySelector('.elements');
//Достаем template
const elementTemplate = document.querySelector('.element-template').content;

//Функция наполнения карточки
function createCard (name, image) {
  //Достаем и копируем всю заготовку карточки. Делаем локально, поскольку если глобально, цикл будет прогонять ее как новую при каждой итерации.
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  //Вводим текст и картинку  
  elementCard.querySelector('.element__name').textContent = name;
  elementCard.querySelector('.element__pic').src = image;
  //Запускаем слушатели на события внутри карточек
  setListeners(elementCard);
  //Результатом действия функции будет возврат заполненной карточки elementCard(.element)
  return elementCard;
};


//Слушатели событий на элементы внутри карточки
function setListeners(element) {
  //слушатель на кнопку like
  element.querySelector('.element__like-button').addEventListener('click', handleLike);
  //слушатель на кнопку delete
  element.querySelector('.element__delete-button').addEventListener('click', handleCardDelete);
  //Реализуем открытие popup с картинкой. Необходимо вытащить саму картинку, и на нее уже повесить клик.
  //из каждого приходящего element мы достаем картинку
  const elementPic = element.querySelector('.element__pic')
  //слушатель на картинку.! В addEventListener нельзя вызывать функцию, на нее можно только сослаться. т.е. написать  handlePopupPic(element) после click нельзя
  elementPic.addEventListener('click', function() {
    handlePopupPic(element)
  });
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

//Функция добавления карточек из массива
function renderCard () {
    initialCards.forEach((item) => {
      //Обозначаем переменную с произвольным названием и в нее записываем 
      //функцию с входящими параметрами, которые вытаскиеваем из массива 
      //обращением через точку. item - каждый элемент массива
      const elCard = createCard(item.name, item.image);
      //Добавляем эту переменную в секцию карточек
      elementSection.prepend(elCard);
      //Также ее можно записать так:
      //elementSection.prepend(createCard(item.name, item.image))
    })
}
//Запускаем дефолтное заполнение карточками.
renderCard();

//Popup форма Card
//Выборка формы и кнопок с ней связанных
const popupFormCard = document.querySelector('.popup_type_card');
const popupFormCardOpenElement = document.querySelector('.profile__add-button');
const popupFormCardCloseElement = popupFormCard.querySelector('.popup__button-close');
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
  const image = popupFormCard.querySelector('.popup__input_type_image-url');
  const name = popupFormCard.querySelector('.popup__input_type_image-name');
  //Создаем переменную внутрь которой передаем функцию с входными параметрами значений(value) инпутов
  const elCard = createCard(name.value, image.value);
  //Добавляем переменную в контейнер section
  elementSection.prepend(elCard);
  //Обнуляем значения инпутов, дабы при открытии они не сохранялись
  name.value = '';
  image.value = '';
  //Закрываем форму после нажатия кнопки (Создать)
  closePopup(popupFormCard);
})



// //Popup  с картинкой
//Выбираем весь popup
const popupPic = document.querySelector('.popup_type_pic')
//Выбираем кнопку закрытия
const popupPicCardCloseButton = popupPic.querySelector('.popup__button-close');

//Описываем логику открытия popup с картинкой
function handlePopupPic(element) {
  //запускаем функцию открытия popup и на вход передаем весь popup
  openPopup(popupPic)
  //Выборка элементов картинки и заголовка
  const elementPic = element.querySelector('.element__pic');
  const elementTitle = element.querySelector('.element__name');
  //Выборка popup элементов картинки и заголовка
  const popupElementTitle = popupPic.querySelector('.popup__title-pic');
  const popupElementPic = popupPic.querySelector('.popup__pic')
  //Значению заголовка popup присваиваем значение заголовка элемента
  popupElementTitle.textContent = elementTitle.textContent;
  //Значению источника картинки popup присваиваем значение источника элемента
  popupElementPic.src = elementPic.src
}

//Слушатель и закрытие карточки
popupPicCardCloseButton.addEventListener('click', function(){
  closePopup(popupPic);
});
