import { useState } from "react";
import { Plus } from "phosphor-react";

import { Header } from "./components/Header";
import { TextInput } from "./components/TextInput";
import { TodoList } from "./components/TodoList";

export type Todo = {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
};

export type UpdateTodoPayload = {
  id: string;
  title: string;
};

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  function createTodo(title: string) {
    setTodos((prevState) => [
      ...prevState,
      {
        userId: "1",
        id: String(todos.length),
        title: title,
        completed: false,
      },
    ]);
    setNewTodo("");
  }

  function toggleCompleted(todoId: string) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  }

  function updateTodo({ id, title }: UpdateTodoPayload) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodos);
  }

  function deleteTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  return (
    <>
      <Header />

      <main className="w-full">
        <div className="w-4/5 mx-auto flex items-start justify-between gap-16">
          <div className="w-1/2 flex flex-col gap-4">
            {todos.length === 0 ? (
              <h2 className="text-gray-200">Nenhuma atividade adicionada</h2>
            ) : (
              <TodoList
                todos={todos}
                toggleCompleted={toggleCompleted}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            )}
          </div>

          <div className="w-1/2 flex items-center gap-5">
            <TextInput
              placeholder="Adicionar nova atividade"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />

            <button
              type="button"
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold h-10 w-10 rounded-md flex items-center justify-center"
              onClick={() => createTodo(newTodo)}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
