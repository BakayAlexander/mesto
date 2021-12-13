import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submiter }) {
    super(popupSelector);
    this._submiter = submiter;
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
    const inputList = this._popup.querySelectorAll('.popup__input');
    inputList.forEach((inputElement) => {
      inputElement.value = '';
    });
    // const inputName = this._popup.querySelector('[name=fullname]');
    // inputName.value = '';

    // const inputs = this._getInputValues();
    // inputs.name = '';
    // console.log(inputs);
  }
}
