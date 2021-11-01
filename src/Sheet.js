import Paper from 'paper';

import LineCommand from './LineCommand';
import SelectCommand from './SelectCommand';
import CommandManager from './CommandManager';
import Grid from './Grid';
import PanZoom from './PanZoom';

let activeSheet = null;

function getActiveSheet() {
  return activeSheet;
}

class Sheet {
  constructor(store, canvas) {
    activeSheet = this;

    this.store = store;
    this.canvas = canvas;

    this.paper = new Paper.PaperScope();
    this.paper.setup(this.canvas);

    this.drawingLayer = new Paper.Layer({ name: 'drawing' });

    this.grid = new Grid(this.paper);
    this.manager = new CommandManager();
    this.panZoom = new PanZoom(this.paper, this.canvas, () => this.onViewChange());

    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 'z') {
        this.manager.undo();
      } else if (event.ctrlKey && event.key === 'y') {
        this.manager.redo();
      }
    });

    this.resize();

    this.drawingLayer.activate();
    this.activateTool('select');
  }

  activateTool(tool) {
    let command = null;
    switch (tool) {
      case 'select':
        command = new SelectCommand(this.store, this.paper, this.canvas, this.grid);
        break;
      case 'line':
        command = new LineCommand(this.store, this.paper, this.canvas, this.grid);
        break;
      default:
        return;
    }

    this.manager.setCommand(command);
  }

  onViewChange() {
    this.grid.draw();
  }

  resize() {
    const { height, width } = this.canvas.parentNode.getBoundingClientRect();
    this.paper.view.viewSize = [width, height];
    this.grid.draw();
  }
}

export { getActiveSheet, Sheet };
