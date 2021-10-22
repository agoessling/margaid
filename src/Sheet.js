import Paper from 'paper';

import Command from './Command';
import CommandManager from './CommandManager';
import Grid from './Grid';
import PanZoom from './PanZoom';

class Sheet {
  constructor(canvas) {
    this.canvas = canvas;

    this.paper = new Paper.PaperScope();
    this.paper.setup(this.canvas);

    this.grid = new Grid(this.paper);
    this.command = new Command(this.paper, this.canvas, this.grid);
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
    this.manager.setCommand(this.command);
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

export default Sheet;
