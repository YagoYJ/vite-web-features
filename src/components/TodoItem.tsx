import { useEffect, useRef, useState } from "react";
import { Check, PencilSimple, Trash, X } from "phosphor-react";

import { Todo, UpdateTodoPayload } from "../App";

interface TodoItemProps {
  todo: Todo;
  completedTodo: (todoId: string) => void;
  updateTodo: ({ id, title }: UpdateTodoPayload) => void;
  deleteTodo: (id: string) => void;
}

export function TodoItem({
  todo,
  completedTodo,
  updateTodo,
  deleteTodo,
}: TodoItemProps) {
  const [newValue, setNewValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function cancelEdit() {
    setIsEditing(false);
    setNewValue("");
  }

  function handleUpdateTodo() {
    setIsEditing(false);
    updateTodo({ id: todo.id, title: newValue });
    setNewValue("");
  }

  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center">
        <input
          id="toggle-task-done"
          type="checkbox"
          value={String(todo.completed)}
          className="hidden"
        />
        <label
          htmlFor="toggle-task-done"
          className="text-sm font-medium text-gray-900 dark:text-gray-300"
          onClick={() => completedTodo(todo.id)}
        >
          {todo.completed ? (
            <div className="w-4 h-4 bg-emerald-500 cursor-pointer rounded-sm flex items-center justify-center">
              <Check size={15} className="text-emerald-50" />
            </div>
          ) : (
            <div className="w-4 h-4 bg-white cursor-pointer rounded-sm" />
          )}
        </label>
      </div>

      <input
        ref={inputRef}
        id={`edit-todo-${todo.id}`}
        value={isEditing ? newValue : todo.title}
        onChange={(e) => setNewValue(e.target.value)}
        disabled={!isEditing}
        className={`bg-transparent border-solid border-2 ${
          todo.completed ? "border-emerald-500 line-through" : "border-white"
        } rounded-md w-full p-2 disabled:bg-transparent text-emerald-50`}
      />

      <div className="flex items-center justify-center gap-2">
        {isEditing ? (
          <>
            <button
              className="hover:[&>*]:text-emerald-500"
              onClick={handleUpdateTodo}
            >
              <Check size={20} className="text-emerald-50" />
            </button>

            <div className="h-5 w-[1px] bg-emerald-50" />

            <button className="hover:[&>*]:text-red-500" onClick={cancelEdit}>
              <X size={20} className="text-emerald-50" />
            </button>
          </>
        ) : (
          <>
            <button
              className="hover:[&>*]:text-emerald-500"
              onClick={() => setIsEditing(true)}
            >
              <PencilSimple size={20} className="text-emerald-50" />
            </button>

            <div className="h-5 w-[1px] bg-emerald-50" />

            <button
              className="hover:[&>*]:text-red-500"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash size={20} className="text-emerald-50" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
