import { Popup } from './Popup';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  submit(submiter) {
    this._submiter = submiter;
  }

  setEventListeners() {
    const form = this._popup.querySelector('.popup__form');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiter();
      this.close();
    });
  }
}
