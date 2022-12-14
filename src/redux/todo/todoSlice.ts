import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateTodoPayload,
  DeleteTodoPayload,
  TodoState,
  ToggleCompleteTodoPayload,
  UpdateTodoPayload,
} from "./types";

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<CreateTodoPayload>) => {
      state.todos = [
        ...state.todos,
        {
          completed: false,
          id: String(state.todos.length),
          title: action.payload.title,
          userId: "1",
        },
      ];
    },
    toggleCompleted: (
      state,
      action: PayloadAction<ToggleCompleteTodoPayload>
    ) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
    },
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
          };
        } else {
          return todo;
        }
      });
    },
    deleteTodo: (state, action: PayloadAction<DeleteTodoPayload>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { createTodo, deleteTodo, toggleCompleted, updateTodo } =
  todoSlice.actions;

export const todoReducer = todoSlice.reducer;
