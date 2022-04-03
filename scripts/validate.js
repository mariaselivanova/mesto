const objValidity = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive"
};

const showInputError = (formElement, inputElement, errorMessage, objectForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objectForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectForm.errorSpanClass);
};

const hideInputError = (formElement, inputElement, objectForm) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objectForm.inputErrorClass);
  errorElement.classList.remove(objectForm.errorSpanClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, objectForm) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objectForm);
  } else {
    hideInputError(formElement, inputElement, objectForm);
  }
};

const enableValidation = (objectForm) => {
  const formList = Array.from(document.querySelectorAll(objectForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, objectForm);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, objectForm) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objectForm.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(objectForm.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, objectForm) => {
  const inputList = Array.from(formElement.querySelectorAll(objectForm.inputSelector));
  const buttonElement = formElement.querySelector(objectForm.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objectForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objectForm)
      toggleButtonState(inputList, buttonElement, objectForm);
    });
  });
};

enableValidation(objValidity);
