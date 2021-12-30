export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  //отрисовываем отдельный элемент
  renderItems(items) {
    items.forEach((item) => this._renderer(item));
  }

  //метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}
