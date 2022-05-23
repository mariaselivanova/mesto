
export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector }, buttonEditProfile ) {
    this._userName = document.querySelector(userNameSelector),
    this._userDescription = document.querySelector(userInfoSelector),
    this._avatar = document.querySelector(avatarSelector),
    this._buttonEditProfile = buttonEditProfile
  }

  //Возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userDescription.textContent,
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, info, avatar }) {
    this._userName.textContent = name;
    this._userDescription.textContent = info;
    this._avatar.src = avatar;
  }

  //Получить ID пользователя.
  getUserId() {
    return this._userID
  }

//Установить ID пользователя.
  setUserId(id) {
    this._userID = id
  }

}
