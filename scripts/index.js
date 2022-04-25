import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'

const initialElements = [
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

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const paragraphName = document.querySelector('.profile__name');
const paragraphJob = document.querySelector('.profile__profession');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const formAdd = document.querySelector('.popup__form_add');
const buttonSave = document.querySelector('.popup__save_type_add');
const popupPic = document.querySelector('.popup_type_pic');
const popupImage = document.querySelector('.popup__image');
const captionPic = document.querySelector('.popup__caption');
const elementsContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', setEscListener);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', setEscListener);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive"
};

const editProfileValidator = new FormValidator(validationConfig, formElementEdit);
const addCardValidator = new FormValidator(validationConfig, formAdd);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function handleProfileFormSubmit(event) {
  event.preventDefault();
  paragraphName.textContent = nameInput.value;
  paragraphJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function openPopupProfile() {
  editProfileValidator.resetValidation();
  openPopup(popupEdit);
  nameInput.value = paragraphName.textContent;
  jobInput.value = paragraphJob.textContent;
}

function openPopupCard() {
  addCardValidator.resetValidation();
  openPopup(popupAdd);
}

function createCard(item) {
  const newCard = new Card(item, '.card-template_type_default', handleCardClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const data = {
    description: titleInput.value,
    image: linkInput.value
  }
  elementsContainer.prepend(createCard(data));
  closePopup(popupAdd);
}

function setEscListener(e) {
  if (e.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

initialElements.forEach((item) => {
  elementsContainer.append(createCard(item));
});

function handleCardClick(description, image) {
  popupImage.src = image;
  captionPic.textContent = description;
  popupImage.alt = description;
  openPopup(popupPic);
}

buttonEdit.addEventListener('click', openPopupProfile);
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
buttonAdd.addEventListener('click', openPopupCard);
formElementAdd.addEventListener('submit', handleAddFormSubmit);
