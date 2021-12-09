export class Section {
  constructor({ items, renderer }, container) {
    this._renderer = renderer;
    this._renderItems = items;
    this._container = container;
  }
}
