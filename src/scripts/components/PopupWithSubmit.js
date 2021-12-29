import { Popup } from './Popup';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  submit(submiter) {
    this._submiter = submiter;
  }

  setEventListeners() {
    super.setEventListeners();
    //за счет всплытия события его можно отловить не только на форме, но и на popup
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiter();
      this.close();
    });
  }
}