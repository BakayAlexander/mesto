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
    this._ownerId = data.owner._id;
    this._id = data._id;
  }

  _getTempalte() {
    const elementCard = this._template.content.querySelector('.element').cloneNode(true);
    return elementCard;
  }

  _setEventListeners() {
    const likeButton = this._elementCard.querySelector('.element__like-button');
    likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
    //Добавим проверку условия,чтобы не навешивать слушатель на чужие карточки
    if (this._userId === this._ownerId) {
      this._elementCard.querySelector('.element__delete-button').addEventListener('click', this.handleDeleteClick);
    }
  }

  handleDelete() {
    this._elementCard.remove();
    this._elementCard = '';
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
    this._removeDeleteButton(this._userId);
    return this._elementCard;
  }

  //Подсчитываем лайки при загрузке карточек
  countLikes = (currentLikes) => {
    this._cardLikes.textContent = currentLikes;
  };

  //Логика установки лайков. Затем передаем ее в слушатели событий.
  _handleLikeClick(evt) {
    const likeButton = this._elementCard.querySelector('.element__like-button');
    if (evt.target.classList.contains('element__like-button_acive')) {
      this.handleLikeClickDeactive(this._id, this.countLikes);
      likeButton.classList.remove('element__like-button_acive');
    } else {
      this.handleLikeClickActive(this._id, this.countLikes);
      likeButton.classList.add('element__like-button_acive');
    }
  }

  //При наполнении карточками проверяем на каких стоит наш like
  _addLikes(userId) {
    this._likes.forEach((like) => {
      if (like._id === userId) {
        this._elementCard.querySelector('.element__like-button').classList.add('element__like-button_acive');
      }
    });
  }

  //При наполнении проверяем нами ли создана и если нет, убираем кнопку удаления
  _removeDeleteButton(userId) {
    if (this._ownerId !== userId) {
      this._elementCard.querySelector('.element__delete-button').style.display = 'none';
    }
  }
}
