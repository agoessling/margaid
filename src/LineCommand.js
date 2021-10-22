import Command from './Command';

class LineCommand extends Command {
  constructor(paper, canvas, grid) {
    super(paper, canvas, grid);

    this.manhattanDir = 'vertical';
    this.path = new Paper.Path({ insert: false });
    this.path.strokeColor = 'black';
  }
}

export default LineCommand;
