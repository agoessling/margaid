import Paper from 'paper';

class PanZoom {
  constructor(paper, canvas, onViewChange) {
    this.paper = paper;
    this.canvas = canvas;
    this.onViewChange = onViewChange;

    // Allow zooming and dragging within canvas.
    this.canvas.addEventListener('wheel', (event) => this.onWheel(event));
    this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
    this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));

    // Disable context menu.
    this.canvas.addEventListener('contextmenu', (event) => event.preventDefault());

    // Allow releasing in entire window to avoid sticky cursor.
    window.addEventListener('mouseup', (event) => this.onMouseUp(event));
  }

  onMouseDown(event) {
    // Only respond to right-click.
    if (event.button !== 2) {
      return;
    }

    // Capture drag start location in view and project coordinates.
    this.dragPointView = new Paper.Point([event.offsetX, event.offsetY]);
    this.dragPointProject = this.paper.view.viewToProject(this.dragPointView);
    this.moved = false;
  }

  onMouseMove(event) {
    // Only respond to right-click.
    if (event.buttons !== 2) {
      return;
    }
    event.stopPropagation(); // Needed to avoid multiple calls due to window event listener.

    // Get cursor position in view and project coordinates.
    const cursorPointView = new Paper.Point([event.offsetX, event.offsetY]);
    const cursorPointProject = this.paper.view.viewToProject(cursorPointView);
    const delta = cursorPointView.subtract(this.dragPointView);

    // Only consider it to be "dragging" after a minimum move to avoid dragging on single
    // right-click.
    if (!this.moved && delta.length < 10) {
      return;
    }
    this.moved = true;

    document.body.style.cursor = 'move';

    // Translate the view so the original drag point is beneath cursor.
    this.paper.view.translate(cursorPointProject.subtract(this.dragPointProject));

    if (this.onViewChange) {
      this.onViewChange();
    }
  }

  onMouseUp(event) {
    // Only respond to right-click.
    if (event.button !== 2) {
      return;
    }
    event.stopPropagation(); // Needed to avoid multiple calls due to window event listener.

    document.body.style.cursor = 'default';

    // Only emit right click if there was no drag.
    if (!this.moved) {
      this.canvas.dispatchEvent(new Event('rightclick'));
    }
  }

  onWheel(event) {
    event.preventDefault();

    let scale = 1.2;
    if (event.deltaY < 0) {
      scale = 0.8;
    }

    // Scale around cursor location.
    this.paper.view.scale(scale, this.paper.view.viewToProject([event.offsetX, event.offsetY]));

    if (this.onViewChange) {
      this.onViewChange();
    }
  }
}

export default PanZoom;
