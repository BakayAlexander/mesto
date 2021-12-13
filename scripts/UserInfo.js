export class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    console.log(description);
  }

  getUserInfo() {
    const obj = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return obj;
  }

  setUserInfo(inputName, inputDescrition) {
    this._name.textContent = inputName;
    this._description.textContent = inputDescrition;
  }
}
