export default class Card {
  constructor({ data, handleCardClick, handleDeleteIcon, handleLikeClick }, cardSelector, userID) {
    this._description = data.description;
    this._image = data.image;
    this._likeCounter = data.likeCounter;
    this._id = data.id;
    this._ownerID = data.ownerID;
    this._likes = data.likes;
    this._isLikedByUser = this._likes.some(item => item._id == this._userID)
    this._handleCardClick = handleCardClick;
    this._handleDeleteIcon = handleDeleteIcon;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._userID = userID;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  isLiked() {
    return this._isLikedByUser
  }


  getID() {
    return this._id
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._elementImage.src = this._image;
    this._elementImage.alt = this._description;
    if (this._ownerID === this._userID) {
      this._elementDeleteButton.classList.add('element__delete-button_active')
    }

    if (this._likes.some(item => { return item._id === this._userID })) {
      this._elementLikeButton.classList.add('element__like-button_active');
    }
    this._element.querySelector('.element__paragraph').textContent = this._description
    this._elementLikeCounter.textContent = this._likeCounter;
    this._setEventListeners();
    return this._element;
  }

  toggleLikes(data) {
    this._elementLikeCounter.textContent = data.likes.length;
    this._isLikedByUser = !this._isLikedByUser

    if (this._isLikedByUser) {
      this._elementLikeButton.classList.add('element__like-button_active');

    } else {
      this._elementLikeButton.classList.remove('element__like-button_active');

    }
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._description, this._image)
    });
  }

}
