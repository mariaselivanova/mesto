import Popup from "./Popup.js";

export default class PopupwithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
  }

  //собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._formElement.reset()
  }


}
