import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = [...this._popup.querySelectorAll('.popup__input')];
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiter(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
