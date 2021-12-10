export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._container = containerSelector;
  }
  //отрисовываем отдельный элемент
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  //метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}
