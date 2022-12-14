import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todoReducer,
  },
});

// Infere os tipos `RootState` e `AppDispatch` do próprio store
export type RootState = ReturnType<typeof store.getState>;
// Exemplo de tipo inferido: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
