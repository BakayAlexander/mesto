import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title-pic');
    this._link = this._popup.querySelector('.popup__pic');
  }
  open({ name, image }) {
    super.open();
    this._title.textContent = name;
    this._link.src = image;
    this._title.alt = name;
  }
}
