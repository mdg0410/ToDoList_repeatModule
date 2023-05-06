export default class Task {
  constructor(description, completed = false, index = null) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.isEditing = false;
  }

  createNode = () => {
    const Node = document.createElement('li');
    Node.setAttribute('data-task', true);
    Node.innerHTML = `
    <div class="task-item-container">
    <label htmlFor="complete-task" class="task-status"><input ${this.completed ? 'checked' : ''} type="checkbox" name="complete-task"/>
    ${!this.completed ? `<i class="bi bi-square" data-task-id="${this.index}"></i>` : `<i class="bi bi-check-lg" data-task-id="${this.index}"></i>`} </label>
    <form name="task-${this.index}">
      <input type="text" class="task-item ${this.completed ? 'task-completed' : ''}" required name="description" data-task-id="${this.index}" value="${this.description}" />
      <input type="hidden" value="${this.index}" name="index" />
    </form>
  </div>
  <button type='button' class="trash hidden" data-task-index="${this.index}"><i class="fa-solid fa-trash"></i></button><i class="fa-solid fa-bars" data-task-index="${this.index}"></i>
    `;

    const descriptionNode = Node.querySelector('input.task-item');

    return { Node, descriptionNode, taskIndex: this.index };
  }
}