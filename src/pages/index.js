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
  avatarWrap,
  formAvatar,
  deleteButton,
  buttonChangeAvatar,
  buttonAddPic,
  buttonEditProfile
}
  from '../utils/constants.js';

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
}, buttonEditProfile);
const popupWithImage = new PopupWithImage('.popup_type_pic');
const popupAdd = new PopupWithForm('.popup_type_add', handleFormAddSubmit);
const popupProfile = new PopupWithForm('.popup_type_edit', handleFormProfileSubmit);
const popupDelete = new PopupWithSubmit({ selectorPopup: '.popup_type_delete' });
const popupAvatar = new PopupWithForm('.popup_type_avatar', handleFormAvatarSubmit);
const cardList = new Section(cardRenderer, '.elements');

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
    },
    handleLikeClick: () => {
      if (!newCard.isLiked()) {
        api.addLike(newCard.getID())
          .then((data) => {
            newCard.toggleLikes(data);
          })
          .catch((err) => console.log(err))
      } else {
        api.deleteLike(newCard.getID())
          .then((data) => {
            newCard.toggleLikes(data);
          })
          .catch((err) => console.log(err))
      }
    }
  }

    , '.card-template_type_default', user.getUserId());
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
  api.changeUserInfo({ name: name, about: info })
    .then((item) => {
      user.setUserInfo({
        name: item.name,
        info: item.about,
        avatar: item.avatar
      })
    })
    .catch((err) => console.log(err))
    .finally(() => {
      buttonEditProfile.textContent = 'Сохранить'
    })
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
function handleFormAvatarSubmit({ avatar: avatarData }) {
  buttonChangeAvatar.textContent = 'Сохранение...'
  api.changeUserAvatar({ avatar: avatarData })
    .then((item) => {
      user.setUserInfo({
        name: item.name,
        info: item.about,
        avatar: item.avatar
      })
      popupAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      buttonChangeAvatar.textContent = 'Сохранить'
    })
}

//Рендер карточек.
function cardRenderer(item) {
  cardList.addInitialItem(createCard(item))
}

//Получить изначальные карточки.
const initialCards = api.getAllCards()
  .then((data) => {
    const cards = data.map((item) => ({
      description: item.name,
      image: item.link,
      likeCounter: item.likes.length,
      id: item._id,
      ownerID: item.owner._id,
      likes: item.likes
    }))
    return cards
  })
  .catch((err) => alert(err))

//Получить информацию о пользователе.
const userData = api.handleUserInfo()
  .then((userData) => {
    return userData
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

//в Promise.all передаем массив промисов, которые нужно выполнить.
Promise.all([
  initialCards,
  userData
])
  .then(([cards, userData]) => {
    cardList.renderItems(cards);
    user.setUserId(userData._id);
    user.setUserInfo({
      name: userData.name,
      info: userData.about,
      avatar: userData.avatar
    })
  })
  .catch((err) => {
    console.log(err);
  })
