import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputName = this._popup.querySelector('[name=fullname]');
    const inputDescription = this._popup.querySelector('[name=description]');
    const item = {
      name: inputName.value,
      description: inputDescription.value,
    };
    return item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submiter(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
