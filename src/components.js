export const createList = (name) => ({ id: Date.now().toString(), name, tasks: [] });

export const createTask = (name, dueDate) => ({
  id: Date.now().toString(), name, dueDate, complete: false,
});
