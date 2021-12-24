export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._template = template;
    this.handleCardClick = handleCardClick;
  }

  _getTempalte() {
    const elementCard = this._template.content.querySelector('.element').cloneNode(true);
    return elementCard;
  }

  _setEventListeners() {
    this._elementCard.querySelector('.element__like-button').addEventListener('click', this._handleLike);
    this._elementCard.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }

  _handleLike = (evt) => {
    evt.target.classList.toggle('element__like-button_acive');
  };

  _handleDelete = () => {
    this._elementCard.remove();
  };

  createCard = () => {
    this._elementCard = this._getTempalte();
    this._cardImage = this._elementCard.querySelector('.element__pic');
    this._cardName = this._elementCard.querySelector('.element__name');
    this._setEventListeners();
    this._cardName.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    return this._elementCard;
  };
}
