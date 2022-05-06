export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popupElement = document.querySelector(this._selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  //добавляет слушатель клика иконке закрытия попапа.
  //Модальное окно также закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }

      if (evt.target.classList.contains('popup__close-button')) {
        this.close()
      }
    });
  }
}
