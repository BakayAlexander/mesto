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

  _getInputList(formElement) {
    const inputList = [...formElement.querySelectorAll(this._inputSelector)];
    return inputList
  }

  _getSubmitButton(formElement) {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    return buttonElement
  }

  //Функция показа ошибки на input
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //Функция скрытия ошибки на input
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
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
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Функция добавления слушателей
  _setEventListeners = (formElement) => {
    const inputList = this._getInputList(formElement);
    const buttonElement = this._getSubmitButton(formElement);
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

  //Функция перезагрузки ошибок и кнопок
  resetValidation() {  
    const inputList = this._getInputList(this._formElement)
    const buttonElement = this._getSubmitButton(this._formElement);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement)
    });
  }
  
  //Функция очистки полей ввода
  resetInputs () {
    const inputList = this._getInputList(this._formElement)
    inputList.forEach((inputElement) => {
      inputElement.value = '';
    });
  }
}