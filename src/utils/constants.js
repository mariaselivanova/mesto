export const initialElements = [
  {
    description: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    description: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    description: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    description: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    description: 'Холмогорский район',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    description: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const formAdd = document.querySelector('.popup__form_add');
const formEdit = document.querySelector('.popup__form_edit');
const elementsContainer = document.querySelector('.elements');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive"
};

export { buttonAdd, buttonEdit, nameInput, jobInput, titleInput, linkInput, formAdd, formEdit, elementsContainer, validationConfig }
