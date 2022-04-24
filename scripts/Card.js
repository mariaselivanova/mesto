import { initialElements, openPopup, closePopup, popupPic, buttonClosePic, popupImage, captionPic } from './index.js'

export class Card {
  constructor(data, cardSelector) {
    this._description = data.description;
    this._image = data.image;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._description;
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
      this._handleOpenPopupPic()
    });

    buttonClosePic.addEventListener('click', () => {
      closePopup(popupPic)
    });

  }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteButton() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }

  _handleOpenPopupPic() {
    popupImage.src = this._image
    captionPic.textContent = this._description
    popupImage.alt = this._description
    openPopup(popupPic);
  }

}

initialElements.forEach((item) => {
  const card = new Card(item, '.card-template_type_default');
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});
