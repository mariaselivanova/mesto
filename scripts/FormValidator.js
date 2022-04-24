
export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._validationConfig.errorSpanClass);
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorSpanClass);
    errorElement.textContent = '';
  };

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  resetValidation() {
    this._form.reset();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    }); 3
    this._toggleButtonState()
  }

}

