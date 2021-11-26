import {obj} from './settings.js'

export class FormValidator {
  constructor (obj, formElement) {
    this._formElement = formElement;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }

  //Функция показа ошибки на input
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  };

  //Функция скрытия ошибки на input
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(obj.errorClass);
  }

  //Функция показа/скрытия ошибки input
  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  //Функция проверки валидности input
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Функция переключения кнопки submit
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(obj.inactiveButtonClass);
    }
  }

  //Функция добавления слушателей
  _setEventListeners = (formElement) => {
    const inputList = [...formElement.querySelectorAll(this._inputSelector)];
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        // console.log('ну хоть инпут работает')
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }

  //Функция запуска валидации
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners(this._formElement);
  }
}



//Функция очистки ошибок input
export function resetInputErrors (element) {
  const inputList = [...element.querySelectorAll('.popup__input')];
  const errorList = [...element.querySelectorAll('.popup__input-error')];
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  })
  errorList.forEach((errorElement) => {
    errorElement.classList.remove('.popup__input-error_activate');
    errorElement.textContent = '';
  })
}

//Функция очистки полей ввода
export function resetInputs (element) {
  const inputList = [...element.querySelectorAll('.popup__input')];
  inputList.forEach((inputElement) => {
    inputElement.value = '';
  });
}