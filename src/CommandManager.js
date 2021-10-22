class CommandManager {
  constructor() {
    this.pastCommands = [];
    this.futureCommands = [];
    this.currentCommand = null;
    this.repeat = true;
  }

  setCommand(command, repeat = true) {
    if (this.currentCommand) this.currentCommand.abort();
    this.currentCommand = command;
    this.repeat = repeat;
    this.activateCommand();
  }

  activateCommand() {
    this.currentCommand.onDone = (command) => this.commandCompleted(command);
    this.currentCommand.activate();
  }

  commandCompleted(command) {
    this.pastCommands.push(command);
    this.futureCommands = [];

    this.currentCommand = null;
    if (!this.repeat) {
      return;
    }

    const nextCommand = command.clone();
    this.setCommand(nextCommand, true);
  }

  undo() {
    const command = this.pastCommands.pop();
    if (!command) return;

    command.undo();
    this.futureCommands.push(command);
  }

  redo() {
    const command = this.futureCommands.pop();
    if (!command) return;

    command.redo();
    this.pastCommands.push(command);
  }
}

export default CommandManager;
