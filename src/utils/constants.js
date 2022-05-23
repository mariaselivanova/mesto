const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const formAdd = document.querySelector('.popup__form_add');
const formEdit = document.querySelector('.popup__form_edit');
const formAvatar = document.querySelector('.popup__form_avatar');
const deleteButton = document.querySelector('.popup__save_type_delete');
const avatarWrap = document.querySelector('.profile__wrap');
const buttonChangeAvatar = document.querySelector('.popup__save_type_avatar');
const buttonAddPic = document.querySelector('.popup__save_type_add');
const buttonEditProfile = document.querySelector('.popup__save_type_edit');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error_active",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive"
};

export {
  buttonAdd,
  buttonEdit,
  nameInput,
  jobInput,
  formAdd,
  formEdit,
  validationConfig,
  deleteButton,
  avatarWrap,
  formAvatar,
  buttonChangeAvatar,
  buttonAddPic,
  buttonEditProfile
 }
