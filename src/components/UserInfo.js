
//отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector),
      this._userDescription = document.querySelector(userInfoSelector)
  }

  //возвращает объект с данными пользователя.
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userDescription.textContent
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name, info }) {
    this._userName.textContent = name;
    this._userDescription.textContent = info;
  }
}
