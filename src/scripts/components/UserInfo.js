export class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const obj = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return obj;
  }

  setUserInfo({ fullname, description, avatar }) {
    this._name.textContent = fullname;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }
}
