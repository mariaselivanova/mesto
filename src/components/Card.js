export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._description = data.description;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    cardImage.src = this._image;
    cardImage.alt = this._description;
    this._element.querySelector('.element__paragraph').textContent = this._description;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._description, this._image)
    });
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteButton() {
    this._element.remove()
  }

}
