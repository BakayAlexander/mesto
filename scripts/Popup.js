export class Popup {
  constructor(popupSelector) {
    // this._popup = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.target === popup) {
      this.close();
    }
  };

  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__button-close');
    popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
