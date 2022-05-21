export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //Получить изначальные карточки.
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }

  //Получить информацию о пользователе.
  handleUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }

  //Изменить данные пользователя.
  changeUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._handleRes(res))
  }

  //Добавить новую карточку.
  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => this._handleRes(res))
  }

  //Изменить аватар пользователя.
  changeUserAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    }).then((res) => this._handleRes(res))
  }

  //Добавить лайк.
  addLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }

  //Удалить лайк.
  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }

  //Удалить карточку.
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }

}
