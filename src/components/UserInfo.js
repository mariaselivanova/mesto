
export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector }, api, buttonEditProfile ) {
    this._userName = document.querySelector(userNameSelector),
      this._userDescription = document.querySelector(userInfoSelector),
      this._avatar = document.querySelector(avatarSelector),
      this._api = api,
      this._buttonEditProfile = buttonEditProfile
  }

  //Возвращает объект с данными пользователя.
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userDescription.textContent
    };
  }

  //Получить информацию о пользователе.
  saveUserInfo() {
    this._api.handleUserInfo()
      .then((item) => {
        this._userName.textContent = item.name;
        this._userDescription.textContent = item.about;
        this._avatar.src = item.avatar;
        this._userID = item._id
      })
      .catch((err) => console.log(err));
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, info }) {
    this._api.changeUserInfo({ name: name, about: info })
      .then((item) => {
        this._userName.textContent = item.name;
        this._userDescription.textContent = item.about;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this._buttonEditProfile.textContent = 'Сохранить'
      })
  }

  //Получить ID пользователя.
  getUserId() {
     return this._userID
  }

}
