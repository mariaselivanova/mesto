import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { initialElements, buttonAdd, buttonEdit, nameInput, jobInput, titleInput, linkInput, formAdd, formEdit, elementsContainer, validationConfig } from '../utils/constants.js';

//Валидация.
const editProfileValidator = new FormValidator(validationConfig, formEdit);
const addCardValidator = new FormValidator(validationConfig, formAdd);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

//Создание классов.
const user = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__profession'
});
const popupWithImage = new PopupWithImage('.popup_type_pic');
const popupAdd = new PopupWithForm('.popup_type_add', handleFormAddSubmit);
const popupProfile = new PopupWithForm('.popup_type_edit', handleFormProfileSubmit);

//Отрисовка изначальных карточек.
function cardRenderer(item) {
  const card = new Card({
    data: item,
    handleCardClick
  }, '.card-template_type_default');
  const cardElement = card.generateCard();
  cardList.addItem(cardElement)
}

const cardList = new Section({ items: initialElements, renderer: cardRenderer }, '.elements')
cardList.renderItems()

//Открыть попап профиля.
function openPopupProfile() {
  editProfileValidator.resetValidation();
  const { name, info } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  popupProfile.open();
}

//Сабмит формы профиля.
function handleFormProfileSubmit({ userName: name, userInfo: info }) {
  user.setUserInfo({ name, info })
  popupProfile.close()
}

//Открыть попап добавления карточки.
function openPopupAdd() {
  addCardValidator.resetValidation();
  popupAdd.open()
}

//Создать одну карточку.
function createCard(item) {
  const newCard = new Card({
    data: item,
    handleCardClick
  }, '.card-template_type_default');
  const cardElement = newCard.generateCard();
  return cardElement;
}

//Сабмит формы добавления карточки.
function handleFormAddSubmit() {
  const data = {
    description: titleInput.value,
    image: linkInput.value
  }
  elementsContainer.prepend(createCard(data));
  popupAdd.close();
}

//Клик по карточке.
function handleCardClick(description, image) {
  popupWithImage.open(description, image);
}

//Слушатели.
buttonEdit.addEventListener('click', openPopupProfile);
buttonAdd.addEventListener('click', openPopupAdd);
popupAdd.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
