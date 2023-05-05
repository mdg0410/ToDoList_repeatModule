import Task from './task.js';

class Display {
  tasks = [];

  storage = 'tasks'

  constructor() {
    this.container = document.getElementById('form-item');
    if (localStorage.getItem(this.storage)) {
      // eslint-disable-next-line max-len
      this.tasks = JSON.parse(localStorage.getItem(this.storage)).map((task) => new Task(task.description, task.completed, task.index));
    } else {
      this.tasks = [
        {
          description: 'Day 1',
          completed: false,
          index: 1,
        },
        {
          description: 'Day 2',
          completed: true,
          index: 2,
        },
        {
          description: 'Day 3',
          completed: false,
          index: 3,
        },
      ];
      this.tasks = this.tasks.map((task) => new Task(task.description, task.completed, task.index));
    }
  }

  saveTask = () => {
    localStorage.setItem(this.storage, JSON.stringify(this.tasks));
  }

  render = () => {
    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const { Node } = task.createNode();
      this.container.after(Node);
      this.saveTask();
    });
  }
}

export default new Display();