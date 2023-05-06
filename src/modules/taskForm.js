export default class TaskForm {
  index = null;

  description = '';

  constructor(name, isUpdate = false) {
    this.form = document.forms[name];
    this.isUpdate = isUpdate;
  }
}