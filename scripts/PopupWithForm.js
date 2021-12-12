import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submiter }) {
    super(popupSelector);
    // this._popup = popupSelector;
    this._submiter = submiter;
  }

  _getInputValues() {
    this._popup.querySelectorAll('.popup__input');
  }

  setEventListeners() {
    super.setEventListeners();
    this._submiter();
  }

  close() {
    super.close();
  }
}
