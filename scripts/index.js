const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseEdit = document.querySelector('.popup__close-button_edit');
const buttonCloseAdd = document.querySelector('.popup__close-button_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupopenedClass = 'popup_opened';
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const paragraphName = document.querySelector('.profile__name');
const paragraphJob = document.querySelector('.profile__profession');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

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

const elementsWrap = document.querySelector('.elements');
const template = document.querySelector('.template').content
const renderElements = (item) => {
  const element = template.cloneNode(true);
  const buttonLike = element.querySelector('.element__like-button');
  const buttonDelete = element.querySelector('.element__delete-button');
  buttonLike.addEventListener('click', handleLikeButton);
  buttonDelete.addEventListener('click', handleDeleteButton);
  element.querySelector('.element__paragraph').textContent = item.name;
  element.querySelector('.element__image').src = item.link;
  elementsWrap.prepend(element);
  const popupPic = document.querySelector('.popup_type_pic');
  const pic = document.querySelector('.element__image');
  const buttonClosePic = document.querySelector('.popup__close-button_pic');

  const openpopuppic = () => {
    popupPic.classList.add('popup_opened');
    popupPic.querySelector('.popup__image').src = item.link;
    popupPic.querySelector('.popup__caption').textContent = item.name;
  }

  const closepopuppic = () => {
    popupPic.classList.remove('popup_opened');
  }

  pic.addEventListener('click', openpopuppic);
  buttonClosePic.addEventListener('click', closepopuppic);
}

const handleLikeButton = (e) => {
  e.target.classList.toggle('element__like-button_active');
}

const handleDeleteButton = (e) => {
  e.target.closest('.element').remove()
}

initialElements.forEach(item => {
  renderElements(item, elementsWrap)
})

function openPopupEdit() {
  popupEdit.classList.add(popupopenedClass);
  nameInput.value = paragraphName.textContent;
  jobInput.value = paragraphJob.textContent;
}

function closePopupEdit() {
  popupEdit.classList.remove(popupopenedClass);
}

function openPopupAdd() {
  popupAdd.classList.add(popupopenedClass);
}

function closePopupAdd() {
  popupAdd.classList.remove(popupopenedClass);
}

function formEditSubmitHandler(event) {
  event.preventDefault();
  paragraphName.textContent = nameInput.value;
  paragraphJob.textContent = jobInput.value;
  closePopupEdit();
}

function formAddSubmitHandler(event) {
  event.preventDefault();
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  }
  renderElements(item);
  closePopupAdd();
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);
buttonCloseEdit.addEventListener('click', closePopupEdit);
buttonCloseAdd.addEventListener('click', closePopupAdd);
formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);
