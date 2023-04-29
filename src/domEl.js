export default function domEl() {
  return {
    $listsContainer: document.getElementById('data-lists'),
    $newListForm: document.getElementById('data-new-list-form'),
    $newListInput: document.getElementById('data-new-list-input'),
    $deleteListButton: document.getElementById('data-delete-list-button'),
    $listDisplayContainer: document.getElementById('data-list-display-container'),
    $listTitleElement: document.getElementById('data-list-title'),
    $listCountElement: document.getElementById('data-list-count'),
    $tasksContainer: document.getElementById('data-tasks'),
    $taskTemplate: document.getElementById('task-template'),
    $newTaskForm: document.getElementById('data-new-task-form'),
    $newTaskInput: document.getElementById('data-new-task-input'),
    $newTaskDueDate: document.getElementById('data-new-task-due-date'),
    $clearCompleteTasksButton: document.getElementById('data-clear-complete-tasks-button'),
  };
}
