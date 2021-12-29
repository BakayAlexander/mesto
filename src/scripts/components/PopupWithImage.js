import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__title-pic');
    this._link = this._popup.querySelector('.popup__pic');
  }
  open({ name, link }) {
    super.open();
    this._title.textContent = name;
    this._link.src = link;
    this._title.alt = name;
  }
}
