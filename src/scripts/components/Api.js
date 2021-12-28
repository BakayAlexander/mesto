export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._body = config.body;
  }

  _prepareDate = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  getProfileData() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  editProfile(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  editAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  getCardsData() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }
  0;

  putCardLikes(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  deleteCardLikes(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
  }

  // getCardLikes(id) {
  //   return fetch(`${this._url}cards/${id}/likes`, {
  //     method: 'GET',
  //     headers: this._headers,
  //   }).then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(res.status);
  //   });
  // }
}
