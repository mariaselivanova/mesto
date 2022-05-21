import './index.css';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  buttonAdd,
  buttonEdit,
  nameInput,
  jobInput,
  formAdd,
  formEdit,
  validationConfig,
  avatarPic,
  avatarWrap,
  formAvatar,
  deleteButton,
  buttonChangeAvatar,
  buttonAddPic,
  buttonEditProfile
}
  from '../utils/constants.js';

var cardList

//Валидация.
const editProfileValidator = new FormValidator(validationConfig, formEdit);
const addCardValidator = new FormValidator(validationConfig, formAdd);
const avatarValidator = new FormValidator(validationConfig, formAvatar);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

//Создание классов.
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    'Content-Type': 'application/json',
    authorization: '4c0b3356-a348-425c-8987-45b8f07b26a2'
  }
});

const user = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__profession',
  avatarSelector: '.profile__avatar'
}, api, buttonEditProfile);
const popupWithImage = new PopupWithImage('.popup_type_pic');
const popupAdd = new PopupWithForm('.popup_type_add', handleFormAddSubmit);
const popupProfile = new PopupWithForm('.popup_type_edit', handleFormProfileSubmit);
const popupDelete = new PopupWithSubmit({ selectorPopup: '.popup_type_delete' });
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormAvatarSubmit)

//Создать одну карточку.
function createCard(item) {
  const newCard = new Card({
    data: item,
    handleCardClick,
    handleDeleteIcon: () => {
      popupDelete.open();
      popupDelete.changeSubmit(() => {
        deleteButton.textContent = "Удаление..."
        api.deleteCard(newCard.getID())
          .then(() => {
            newCard.deleteCard();
            popupDelete.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            deleteButton.textContent = "Да"
          })
      })
    }
  }

    , '.card-template_type_default', user.getUserId(), api);
  const cardElement = newCard.generateCard();
  return cardElement
}

//Клик по карточке.
function handleCardClick(description, image) {
  popupWithImage.open(description, image);
}

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
  buttonEditProfile.textContent = "Сохранение..."
  user.setUserInfo({ name, info })
  popupProfile.close()
}

//Открыть попап добавления карточки.
function openPopupAdd() {
  addCardValidator.resetValidation();
  popupAdd.open()
}

//Сабмит формы добавления карточки.
function handleFormAddSubmit({ link: image, title: description }) {
  buttonAddPic.textContent = 'Создание...'
  api.addNewCard({ name: description, link: image })
    .then((data) => {
      cardList.addItem(createCard({
        image: data.link,
        description: data.name,
        likeCounter: data.likes.length,
        id: data._id,
        ownerID: data.owner._id,
        likes: data.likes
      }));
      popupAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonAddPic.textContent = 'Создать'
    })
}

//Открыть попап с аватаром.
function openPopupAvatar() {
  popupAvatar.open()
}

//Сабмит формы добавления аватара.
function handleFormAvatarSubmit({ link: avatarData }) {
  buttonChangeAvatar.textContent = 'Сохранение...'
  api.changeUserAvatar({ avatar: avatarData })
    .then((item) => {
      avatarPic.src = item.avatar;
      popupAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      buttonChangeAvatar.textContent = 'Сохранить'
    })
}

//Добавить изначальные карточки.
api.getAllCards()
  .then((data) => {
    cardList = new Section({
      items: data.map((item) => ({
        description: item.name,
        image: item.link,
        likeCounter: item.likes.length,
        id: item._id,
        ownerID: item.owner._id,
        likes: item.likes
      })), renderer: cardRenderer
    }, '.elements')
    function cardRenderer(item) {
      cardList.addInitialItem(createCard(item))
    }
    cardList.renderItems();
    return cardList
  })
  .catch((err) => alert(err))


//Слушатели.
buttonEdit.addEventListener('click', openPopupProfile);
buttonAdd.addEventListener('click', openPopupAdd);
popupAdd.setEventListeners();
popupProfile.setEventListeners();
popupWithImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
avatarWrap.addEventListener('click', openPopupAvatar);

//Получить информацию о пользователе.
user.saveUserInfo();

