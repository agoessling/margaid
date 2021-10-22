import Paper from 'paper';

class Command {
  constructor(paper, canvas, grid) {
    this.paper = paper;
    this.canvas = canvas;
    this.grid = grid;
    this.onDone = null;

    this.listeners = [
      [window, 'keydown', (event) => this.onKeyDown(event)],
      [this.canvas, 'mousedown', (event) => this.onMouseDown(event)],
      [this.canvas, 'mousemove', (event) => this.onMouseMove(event)],
      [this.canvas, 'rightclick', (event) => this.onRightClick(event)],
      [this.canvas, 'dblclick', () => this.finalize()],
    ];

    this.manhattanDir = 'vertical';

    this.path = new Paper.Path({ insert: false });
    this.path.strokeColor = 'black';
  }

  clone() {
    return new Command(this.paper, this.canvas, this.grid);
  }

  undo() {
    this.path.remove();
  }

  redo() {
    this.paper.project.activeLayer.addChild(this.path);
  }

  abort() {
    this.removeListeners();
    this.path.remove();
  }

  activate() {
    this.path.removeSegments();
    this.paper.project.activeLayer.addChild(this.path);
    this.addListeners();
  }

  addListeners() {
    this.listeners.forEach(([target, name, func]) => target.addEventListener(name, func));
  }

  removeListeners() {
    this.listeners.forEach(([target, name, func]) => target.removeEventListener(name, func));
  }

  swapManhattan() {
    switch (this.manhattanDir) {
      case 'vertical':
        this.manhattanDir = 'horizontal';
        break;
      case 'horizontal':
        this.manhattanDir = 'vertical';
        break;
      default:
        break;
    }
  }

  onKeyDown(event) {
    if (event.key === ' ') {
      this.swapManhattan();
      this.updateLeader();
    }
  }

  finalize() {
    this.removeListeners();
    this.path.reduce();

    if (this.onDone) this.onDone(this);
  }

  onRightClick() {
    const minLength = this.manhattanDir ? 3 : 1;

    if (this.path.segments.length > minLength) {
      this.path.segments.splice(-2, 1);
      this.swapManhattan();
    } else {
      this.path.removeSegments();
    }

    this.updateLeader();
  }

  onMouseDown(event) {
    if (event.button !== 0) {
      return;
    }

    let nearestPoint = this.paper.view.getEventPoint(event);
    if (!event.shiftKey) {
      nearestPoint = this.grid.nearest(nearestPoint);
    }

    if (this.path.segments.length === 0) {
      this.path.add(nearestPoint);
      if (this.manhattanDir) {
        this.path.add(nearestPoint);
      }
    }

    this.path.add(nearestPoint);
    this.swapManhattan();
  }

  onMouseMove(event) {
    const minLength = this.manhattanDir ? 3 : 1;
    if (this.path.segments.length < minLength) {
      return;
    }

    let nearestPoint = this.paper.view.getEventPoint(event);
    if (!event.shiftKey) {
      nearestPoint = this.grid.nearest(nearestPoint);
    }

    this.path.lastSegment.point = nearestPoint;

    this.updateLeader();
  }

  updateLeader() {
    if (this.path.segments.length < 3) {
      return;
    }

    const lastSegments = this.path.segments.slice(-3);

    switch (this.manhattanDir) {
      case 'vertical':
        lastSegments[1].point.y = lastSegments[2].point.y;
        lastSegments[1].point.x = lastSegments[0].point.x;
        break;
      case 'horizontal':
        lastSegments[1].point.x = lastSegments[2].point.x;
        lastSegments[1].point.y = lastSegments[0].point.y;
        break;
      default:
        break;
    }
  }
}

export default Command;
