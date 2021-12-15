export class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const obj = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return obj;
  }

  setUserInfo({ fullname, description }) {
    this._name.textContent = fullname;
    this._description.textContent = description;
  }
}
