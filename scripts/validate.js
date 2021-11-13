const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: '.popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_activate'
}

//Функция показа ошибки на input
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

//Функция скрытия ошибки на input
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(obj.errorClas);
}
//Функция запуска валидации
function enableValidation () {
  const formList = [...document.querySelectorAll(obj.formSelector)]
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

//Функция добавления слушателей
function setEventListeners (formElement) {
  const inputList = [...formElement.querySelectorAll(obj.inputSelector)];
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}


//Функция показа/скрытия ошибки input
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

//Функция проверки валидности input
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//Функция переключения кнопки submit
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    // buttonElement.classList.add(obj.inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
  }
}

enableValidation(obj);
