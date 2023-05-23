import { format } from 'date-fns';
import domEl from './domEl';
import { createProjectList, createTodo } from './components';

export default function app() {
  const LOCAL_STORAGE_LIST_KEY = 'task.lists';
  const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
  let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
  let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY) || [];

  // save to local storage
  const save = () => {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
  };

  // clear elements and replenish with updated elements
  const clear = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


  // create todo expiration date
  const isDue = () => {
    const selectedList = lists.find((list) => list.id === selectedListId);

    selectedList.tasks.forEach((task) => {
      const date = format(new Date(task.dueDate), 'MM/dd/yyyy');
      const today = format(new Date(new Date()), 'MM/dd/yyyy');
      if (date <= today) task.complete = true;
    });
    save();
  };

  // render todos to the DOM
  const renderTodo = (selectedList) => {
    selectedList.tasks.forEach((task) => {
      const taskElement = document.importNode(domEl().$taskTemplate.content, true);
      const checkbox = taskElement.querySelector('input');
      checkbox.id = task.id;
      checkbox.checked = task.complete;
      const label = taskElement.querySelector('label');
      const dueDate = taskElement.querySelector('label .due-date');
      label.htmlFor = task.id;
      dueDate.append(task.dueDate);
      label.append(task.name, dueDate);
      domEl().$tasksContainer.appendChild(taskElement);
    });
  };

  // render project list to DOM
  const renderLists = () => {
    lists.forEach((list) => {
      const listElement = document.createElement('li');
      listElement.dataset.listId = list.id;
      listElement.classList.add('list-name');
      listElement.innerText = list.name;
      if (list.id === selectedListId) {
        listElement.classList.add('active-list');
      }
      domEl().$listsContainer.appendChild(listElement);
    });
  };

  // render all elements to the DOM
  const render = () => {
    clear(domEl().$listsContainer);
    renderLists();

    const selectedList = lists.find((list) => list.id === selectedListId);
    if (selectedListId == null) {
      domEl().$listDisplayContainer.style.display = 'none';
    } else {
      domEl().$listDisplayContainer.style.display = '';
      domEl().$listTitleElement.innerText = `Project: ${selectedList.name}`;
      clear(domEl().$tasksContainer);
      renderTodo(selectedList);
    }
  };

  // listeners
  domEl().$listsContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId;
      save();
      render();
    }
  });

  domEl().$tasksContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'input') {
      const selectedList = lists.find((list) => list.id === selectedListId);
      const selectedTask = selectedList.tasks.find((task) => task.id === e.target.id);
      selectedTask.complete = e.target.checked;
      save();
    }
  });

  domEl().$clearCompleteTasksButton.addEventListener('click', () => {
    const selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
    save();
    render();
  });

  domEl().$deleteListButton.addEventListener('click', () => {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = null;
    save();
    render();
  });

  domEl().$newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = domEl().$newListInput.value;
    if (listName == null || listName === '') return;
    const list = createProjectList(listName);
    domEl().$newListInput.value = '';
    lists.push(list);
    save();
    render();
  });

  domEl().$newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = domEl().$newTaskInput.value;
    const date = domEl().$newTaskDueDate.value;
    const dueDate = format(new Date(date), 'MM/dd/yyyy');
    if (taskName == null || taskName === '') return;
    const task = createTodo(taskName, dueDate);
    domEl().$newTaskInput.value = null;
    domEl().$newTaskDueDate.value = null;
    const selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks.push(task);
    isDue();
    save();
    render();
  });

  render();
}
