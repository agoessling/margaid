import Paper from 'paper';

import Command from './Command';

class LineCommand extends Command {
  constructor(store, paper, canvas, grid) {
    super(store, paper, canvas, grid);

    this.manhattanDir = 'vertical';
    this.styleUnwatch = null;

    this.path = new Paper.Path({ insert: false });
    this.path.strokeCap = 'round';
    this.path.strokeJoin = 'round';
  }

  clone() {
    return new LineCommand(this.store, this.paper, this.canvas, this.grid);
  }

  undo() {
    this.path.remove();
  }

  redo() {
    this.paper.project.activeLayer.addChild(this.path);
  }

  activate() {
    this.setCursor('crosshair');

    this.path.removeSegments();
    this.paper.project.activeLayer.addChild(this.path);

    this.styleUnwatch = this.store.watch(
      (state) => state.styles.line,
      this.onStyleChange.bind(this),
      { deep: true, immediate: true },
    );

    super.activate();
  }

  abort() {
    super.abort();
    this.path.remove();
    if (this.styleUnwatch) this.styleUnwatch();
  }

  finalize() {
    this.path.reduce();
    if (this.styleUnwatch) this.styleUnwatch();
    super.finalize();
  }

  onLeftMouseDown(event) {
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
    this.swapManhattanDir();
  }

  onMouseMove(event) {
    const minLength = this.manhattanDir ? 3 : 2;
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

  onRightClick() {
    const minLength = this.manhattanDir ? 3 : 2;
    const { length } = this.path.segments;

    if (length > minLength) {
      this.path.removeSegment(length - 2);
      this.swapManhattanDir();
    } else {
      this.path.removeSegments();
    }

    this.updateLeader();
  }

  onDoubleClick() {
    this.finalize();
  }

  onKeyDown(event) {
    if (event.key === ' ') {
      if (event.shiftKey) {
        this.swapLeaderStyle();
      } else {
        this.swapManhattanDir();
      }
      this.updateLeader();
    }
  }

  onStyleChange(...args) {
    this.setStyle(args[args.length - 1]);
  }

  setStyle(style) {
    Object.assign(this.path, style);
  }

  swapLeaderStyle() {
    const minLength = this.manhattanDir ? 3 : 2;
    const { length } = this.path.segments;

    if (this.manhattanDir) {
      this.manhattanDir = null;

      if (length >= minLength) {
        this.path.removeSegment(length - 2);
      }
    } else {
      this.manhattanDir = 'vertical';

      if (length >= minLength) {
        this.path.insert(length - 1, [0, 0]);
      }
    }
  }

  swapManhattanDir() {
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

export default LineCommand;
