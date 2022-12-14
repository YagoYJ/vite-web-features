export type Todo = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export type CreateTodoPayload = {
  title: string;
};

export type ToggleCompleteTodoPayload = {
  todoId: string;
};

export type UpdateTodoPayload = {
  id: string;
  title: string;
};

export type DeleteTodoPayload = {
  id: string;
};

export type TodoState = {
  todos: Todo[];
};
