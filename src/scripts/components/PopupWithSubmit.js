import { Popup } from './Popup';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      // evt.preventDefault();
      this._submiter();
      this.close();
    });
  }
}
