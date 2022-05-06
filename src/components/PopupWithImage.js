import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popupElement.querySelector('.popup__image');
    this._description = this._popupElement.querySelector('.popup__caption');
  }

  open(description, image) {
    this._image.src = image;
    this._description.textContent = description;
    this._image.alt = description;
    super.open();
  }

}
