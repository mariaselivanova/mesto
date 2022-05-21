import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({selectorPopup, handleFormSubmit }) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form')
  }

  close() {
    super.close();
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit()
    });
  }

  changeSubmit(newSubmit) {
    this._handleFormSubmit = newSubmit;
  }

}

