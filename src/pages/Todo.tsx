import { useState } from "react";
import { Plus } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "../components/Header";
import { TextInput } from "../components/TextInput";
import { TodoList } from "../components/TodoList";

import { RootState } from "../redux/store";
import { createTodo } from "../redux/todo/todoSlice";

export function Todo() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todoReducer);

  const [newTodo, setNewTodo] = useState("");

  function handleCreateTodo(title: string) {
    dispatch(createTodo({ title }));

    setNewTodo("");
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
              <TodoList todos={todos} />
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
              onClick={() => handleCreateTodo(newTodo)}
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
