import Command from './Command';

class SelectCommand extends Command {
  clone() {
    return new SelectCommand(this.paper, this.canvas, this.grid);
  }
}

export default SelectCommand;
