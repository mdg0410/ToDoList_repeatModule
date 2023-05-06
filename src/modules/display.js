import Task from './task.js';
import TaskForm from './taskForm.js';

class Display {
  tasks = [];

  storage = 'Task';

  workForm = null;

  constructor() {
    this.container = document.getElementById('form-item');
    if (localStorage.getItem(this.storage)) {
      // eslint-disable-next-line max-len
      this.tasks = JSON.parse(localStorage.getItem(this.storage)).map((task) => new Task(task.description, task.completed, task.index));
    }

    this.setCurrentForm();
  }

  setCurrentForm = (name = 'addTaskForm', isUpdate = false) => {
    this.workForm = new TaskForm(name, isUpdate);
    this.workForm.form.onsubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.workForm.isUpdate) {
      this.updateTask(this.workForm.form.description.value, this.workForm.form.index.value);
    } else {
      this.addTask(this.workForm.form.description.value);
      this.workForm.form.description.focus();
      this.workForm.form.reset();
    }
  }

  addTask = (description) => {
    const task = new Task(description, false, this.tasks.length + 1);
    this.tasks.push(task);
    this.render().saveToLocal();
  }

  updateTask = (description, index) => {
    this.tasks[index - 1].description = description;
    this.saveTask();
  }

  removeTask = (index) => {
    this.tasks = this.tasks.filter((task) => task.index !== index);
    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i + 1;
    }
    this.render().saveTask();
  }

  saveTask = () => {
    localStorage.setItem(this.storage, JSON.stringify(this.tasks));
  }

  render = () => {
    this.container.parentNode.querySelectorAll('[data-task]').forEach((task) => task.remove());
    this.tasks.sort((a, b) => b.index - a.index).forEach((task) => {
      const { Node, descriptionNode, taskIndex } = task.createNode();
      this.container.after(Node);
      this.saveTask();
      descriptionNode.onfocus = (e) => this.editing(e, Node, taskIndex);
      descriptionNode.onblur = (e) => this.edited(e, Node);
    });
    this.tasks.sort((a, b) => a.index - b.index);

    return this;
  }

  editing = (e, taskNode, taskIndex) => {
    taskNode.classList.add('editing-task');
    const trash = taskNode.querySelector('button.trash');
    trash.classList.toggle('hidden');
    this.setCurrentForm(`task-${taskIndex}`, true);
    trash.onmousedown = () => {
      this.removeTask(taskIndex);
      this.setCurrentForm();
    };
    taskNode.querySelector('i.fa-bars').classList.toggle('hidden');
  }

  edited = (e, taskNode) => {
    this.workForm.form.requestSubmit();
    this.setCurrentForm();
    setTimeout(() => {
      taskNode.classList.remove('editing-task');
      taskNode.querySelector('i.fa-bars').classList.toggle('hidden');
      taskNode.querySelector('button.trash').classList.add('hidden');
    }, 200);
  }
}

export default new Display();