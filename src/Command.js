class Command {
  constructor(store, paper, canvas, grid) {
    this.store = store;
    this.paper = paper;
    this.canvas = canvas;
    this.grid = grid;
    this.onDone = null;

    this.listeners = [
      [window, 'keydown', (event) => this.handleKeyDown(event)],
      [this.canvas, 'mousedown', (event) => this.handleMouseDown(event)],
      [this.canvas, 'mouseup', (event) => this.handleMouseUp(event)],
      [this.canvas, 'mousemove', (event) => this.handleMouseMove(event)],
      [this.canvas, 'rightclick', (event) => this.handleRightClick(event)],
      [this.canvas, 'dblclick', (event) => this.handleDoubleClick(event)],
    ];
  }

  handleKeyDown(event) {
    if (this.onKeyDown) this.onKeyDown(event);
  }

  handleMouseDown(event) {
    if (event.button === 0) {
      if (this.onLeftMouseDown) this.onLeftMouseDown(event);
    }
  }

  handleMouseUp(event) {
    if (event.button === 0) {
      if (this.onLeftMouseUp) this.onLeftMouseUp(event);
    }
  }

  handleMouseMove(event) {
    if (this.onMouseMove) this.onMouseMove(event);
  }

  handleRightClick(event) {
    if (this.onRightClick) this.onRightClick(event);
  }

  handleDoubleClick(event) {
    if (this.onDoubleClick) this.onDoubleClick(event);
  }

  static undo() {
  }

  static redo() {
  }

  setCursor(cursor) {
    this.canvas.style.cursor = cursor;
  }

  activate() {
    this.addListeners();
  }

  abort() {
    this.removeListeners();
    this.setCursor('default');
  }

  finalize() {
    this.removeListeners();
    this.setCursor('default');
    if (this.onDone) this.onDone(this);
  }

  addListeners() {
    this.listeners.forEach(([target, name, func]) => target.addEventListener(name, func));
  }

  removeListeners() {
    this.listeners.forEach(([target, name, func]) => target.removeEventListener(name, func));
  }
}

export default Command;
