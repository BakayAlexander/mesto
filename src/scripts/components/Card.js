// export class Card {
//   constructor(data, template, handleCardClick) {
//     this._name = data.name;
//     this._image = data.link;
//     this._likes = data.likes.length;
//     this._template = template;
//     this.handleCardClick = handleCardClick;
//   }

//   _getTempalte() {
//     const elementCard = this._template.content.querySelector('.element').cloneNode(true);
//     return elementCard;
//   }

//   _setEventListeners() {
//     this._elementCard.querySelector('.element__like-button').addEventListener('click', this._handleLike);
//     this._elementCard.querySelector('.element__delete-button').addEventListener('click', this._handleDelete);
//     this._cardImage.addEventListener('click', () => {
//       this.handleCardClick();
//     });
//   }

//   _handleLike = (evt) => {
//     evt.target.classList.toggle('element__like-button_acive');
//   };

//   _handleDelete = () => {
//     this._elementCard.remove();
//   };

//   createCard = () => {
//     this._elementCard = this._getTempalte();
//     this._cardImage = this._elementCard.querySelector('.element__pic');
//     this._cardName = this._elementCard.querySelector('.element__name');
//     this._cardLikes = this._elementCard.querySelector('.element__like-count');
//     this._setEventListeners();
//     this._cardName.textContent = this._name;
//     this._cardImage.src = this._image;
//     this._cardImage.alt = this._name;
//     this._cardLikes.textContent = this._likes;
//     return this._elementCard;
//   };
// }

export class Card {
  constructor({ data, handleCardClick, handleLikeClickActive, handleLikeClickDeactive, handleDeleteClick }, template) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes.length;
    this._template = template;
    this.handleCardClick = handleCardClick;
    this.handleLikeClickActive = handleLikeClickActive;
    this.handleLikeClickDeactive = handleLikeClickDeactive;
    this.handleDeleteClick = handleDeleteClick;
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

  // handleLike = () => {
  //   this._elementCard.querySelector('.element__like-button').classList.toggle('element__like-button_acive');
  // };

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
    this._cardLikes.textContent = this._likes;
    return this._elementCard;
  }

  countLikes(currentLikes) {
    this._cardLikes.textContent = currentLikes;
  }
}
