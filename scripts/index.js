const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonCloseEdit = document.querySelector('.popup__close-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__form_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const paragraphName = document.querySelector('.profile__name');
const paragraphJob = document.querySelector('.profile__profession');

const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popup__close-button_type_add');
const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const popupPic = document.querySelector('.popup_type_pic');

const elements = document.querySelector('.elements');
const template = document.querySelector('.template').content;
const buttonClosePic = document.querySelector('.popup__close-button_type_pic');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  paragraphName.textContent = nameInput.value;
  paragraphJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

const handleLikeButton = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const handleDeleteButton = (e) => {
  e.target.closest('.element').remove()
}

function createCard(item) {
  const card = template.cloneNode(true);
  const image = card.querySelector('.element__image');
  card.querySelector('.element__paragraph').textContent = item.name;
  image.src = item.link;
  image.alt = item.name;
  const buttonLike = card.querySelector('.element__like-button');
  const buttonDelete = card.querySelector('.element__delete-button');
  buttonLike.addEventListener('click', handleLikeButton);
  buttonDelete.addEventListener('click', handleDeleteButton);
  image.addEventListener('click', openPopupPic);
  return card;
};

const addCard = (card) => {
  elements.prepend(card);
};

initialElements.forEach((item) => {
  const initialCards = createCard(item);
  addCard(initialCards);
});

function openPopupProfile() {
  openPopup(popupEdit);
  nameInput.value = paragraphName.textContent;
  jobInput.value = paragraphJob.textContent;
}

function openPopupCard() {
  openPopup(popupAdd);
  titleInput.value = ""
  linkInput.value = ""
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  }
  const newCard = createCard(item);
  addCard(newCard);
  closePopup(popupAdd);
}

function openPopupPic (e) {
  const popupImage = popupPic.querySelector('.popup__image');
  popupImage.src = e.target.src
  popupPic.querySelector('.popup__caption').textContent = e.target.alt;
  popupImage.alt = e.target.alt;
  openPopup(popupPic);
};

buttonEdit.addEventListener('click', openPopupProfile);
buttonCloseEdit.addEventListener('click', () => closePopup(popupEdit));
formElementEdit.addEventListener('submit', handleProfileFormSubmit);
buttonAdd.addEventListener('click', openPopupCard);
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd));
formElementAdd.addEventListener('submit', handleAddFormSubmit);
buttonClosePic.addEventListener('click', () => closePopup(popupPic));

