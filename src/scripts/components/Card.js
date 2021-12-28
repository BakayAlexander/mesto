export class Card {
  constructor(
    { data, handleCardClick, handleLikeClickActive, handleLikeClickDeactive, handleDeleteClick },
    template,
    userId
  ) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._template = template;
    this.handleCardClick = handleCardClick;
    this.handleLikeClickActive = handleLikeClickActive;
    this.handleLikeClickDeactive = handleLikeClickDeactive;
    this.handleDeleteClick = handleDeleteClick;
    this._userId = userId;
  }

  _getTempalte() {
    const elementCard = this._template.content.querySelector('.element').cloneNode(true);
    return elementCard;
  }

  _setEventListeners() {
    const likeButton = this._elementCard.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains('element__like-button_acive')) {
        likeButton.classList.remove('element__like-button_acive');
        this.handleLikeClickDeactive();
      } else {
        likeButton.classList.add('element__like-button_acive');
        this.handleLikeClickActive();
      }
    });
    this._elementCard.querySelector('.element__delete-button').addEventListener('click', this.handleDeleteClick);
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }

  // handleLikeActive = () => {
  //   this._elementCard.querySelector('.element__like-button').classList.add('element__like-button_acive');
  // };

  // handleLikeDelete = () => {
  //   this._elementCard.querySelector('.element__like-button').classList.remove('element__like-button_acive');
  // };

  // handleLikeActive;

  handleDelete() {
    this._elementCard.remove();
  }

  createCard() {
    this._elementCard = this._getTempalte();
    this._cardImage = this._elementCard.querySelector('.element__pic');
    this._cardName = this._elementCard.querySelector('.element__name');
    this._cardLikes = this._elementCard.querySelector('.element__like-count');
    this._setEventListeners();
    this._cardName.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likesCount;
    this._addLikes(this._userId);
    return this._elementCard;
  }
  //Подсчитываем лайки при загрузке карточек
  countLikes(currentLikes) {
    this._cardLikes.textContent = currentLikes;
  }
  //При наполнении карточками проверяем на каких стоит наш like
  _addLikes(userId) {
    this._likes.forEach((like) => {
      if (like._id === userId) {
        console.log('Hey!');
        this._elementCard.querySelector('.element__like-button').classList.add('element__like-button_acive');
      }
    });
  }
}
