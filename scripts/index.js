//Открытие и закрытие формы
//Объявление переменных и выборки

//Выборка кнопки закрытия 
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');

//Выборка кнопки открытия 
const popupOpenButtonElement = document.querySelector('.profile__edit-button');


//Функции

//Функция открытия popup
const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
};

//Функция закрытия popup
const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
};

//Функция закрытия popup при клике на пустую область
const closePopupByClickOverlay = function(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
};


//События 
//Событие 'Открытие popup' 
popupOpenButtonElement.addEventListener('click', openPopup)

//Событие 'Закрытие popup'
popupCloseButtonElement.addEventListener('click', closePopup);

//Событие 'Закрытие popup при клике на пустую область'
popupElement.addEventListener('click', closePopupByClickOverlay);





//Реализация отправки формы

//Объявление переменных и выборки
//Выборка формы
let formElement = popupElement.querySelector('.popup__container');

//Выборка текстовых элементов
let nameElement = document.querySelector('.profile__name');
let descriptionElement = document.querySelector('.profile__description');

//Выборка элементов формы input
let nameInput = formElement.querySelector('.popup__name');
let descriptionInput = formElement.querySelector('.popup__description');

//Подтягиваем текущие значения текстовых элементов в input
nameInput.value = nameElement.textContent;
descriptionInput.value = descriptionElement.textContent;

//Функция 
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

formElement.addEventListener('submit', formSubmitHandler); 



