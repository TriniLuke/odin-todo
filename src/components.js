// factory function to create project list
export const createProjectList = (name) => ({ id: Date.now().toString(), name, tasks: [] });

// factory function to create todo list
export const createTodo = (name, dueDate) => ({
  id: Date.now().toString(), name, dueDate, complete: false,
});
