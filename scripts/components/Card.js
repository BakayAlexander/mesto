export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._image = data.image;
    this._template = template;
    this.handleCardClick = handleCardClick;
  }

  _getTempalte() {
    const elementCard = this._template.content.querySelector('.element').cloneNode(true);
    return elementCard;
  }

  _setEventListeners() {
    this._elementCard = this._getTempalte();
    this._elementCard.querySelector('.element__like-button').addEventListener('click', this._handleLike);
    this._elementCard.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
    const elementPic = this._elementCard.querySelector('.element__pic');
    elementPic.addEventListener('click', () => {
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
    this._setEventListeners();
    this._elementCard.querySelector('.element__name').textContent = this._name;
    this._elementCard.querySelector('.element__pic').src = this._image;
    this._elementCard.querySelector('.element__pic').alt = this._name;
    return this._elementCard;
  };
}
