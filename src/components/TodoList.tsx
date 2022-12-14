import { Todo, UpdateTodoPayload } from "../App";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleCompleted: (todoId: string) => void;
  updateTodo: ({ id, title }: UpdateTodoPayload) => void;
  deleteTodo: (id: string) => void;
}

export function TodoList({
  todos,
  toggleCompleted,
  updateTodo,
  deleteTodo,
}: TodoListProps) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completedTodo={toggleCompleted}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  );
}
