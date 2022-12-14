### Nesse projeto vamos ver muitas funcionalidades do React. Vamos usar as seguintes tecnologias:

- Vite
- TailWind
- ESLint
- Redux Toolkit

## Vite
O Vite é uma ferramente para compilar nosso código, ele é mais rapido que o Webpack e mais enxuto.

Para iniciar um projeto com Vite, vamos rodar o seguinte código com o terminal aberto na sua pasta de projetos:

```cmd
yarn create vite nome_do_projeto
```

Irá aparecer umas opções, escolha **React** e em seguinda **react-ts** para já ser configurado com TypeScript.

Após o fim da instalação, abre o projeto no *vscode* e rode o comando `yarn` para baixar as dependências. Em seguida, adicione o comando `"vite --open"` no script `dev`, dentro do arquivo `package.json`


No terminal digite o código abaixo para rodar o projeto:
```
yarn dev
```

## TailWind
O **TailWind** é uma biblioteca de estilização, ela ajuda bastante na produtividade, pois ela tem uma mecanica de transformar nome de clesses em css, podemos ver como isso funciona no código.

Vamos iniciar instalando:
```cmd
yarn add tailwindcss postcss autoprefixer -D
```

em seguida vamos inicializar as configurações do TailWind:
```cmd
yarn tailwindcss init
```

Será gerado o arquivo `tailwind.config.cjs`.
Crie o arquivo `postcss.config.cjs` e adicione o seguinte código nele:

```js
module.exports = {
    plugins: {
        tailwindcss: {},
    autoprefixer: {},
  }
}
```

No arquivo `tailwind.config.cjs`, troque o `content` por:
```json
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
Isso fará com que o TailWind procure por arquivos de extensão **html, ts e tsx**.
        
Crie o arquivo `src/main.css` e adicione o seguinte código nele:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Agora só importar ele no arquivo `src/main.tsx`

E no arquivo `src/App.tsx` só utilizar ele:
```tsx
export function App() {
  return (
    <h1 className="text-3xl font-bold">
      Hello world!
    </h1>
  )
}
```

**Aviso: Reiniciei o projeto caso ele dê erro**

### ESLint
Para quem não conhece, o ESLint serve para padronizar o seu código, é muito bom para quem trabalha em equipe, pois todos vão ter as mesmas regras em relação ao código, deixando ele mais entendível, igual para todos os devs e também deixa o código mais bonito.

Antes de começar, precisamos instalar as extensões do VSCode **ESLint** e **Prettier**, e também configurar o VSCode para respeitar as configurações do Lint.
Aperte ***CTRL + SHIFT + P** e procure por **Open User Settings (JSON)**, nele, adicione as seguintes configurações, ou substitua caso já exista:
```json
   "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

Agora vamos instalar o ESLint:
```cmd
yarn add eslint -D
```

em seguida vamos configurá-lo:
```cmd
yarn eslint --init
```

Irá aparecer uma sequência de perguntas, você pode responder com o que você preferir, mas o desse projeto foi o seguinte:
- To check syntax, find problems, and enforce code style
- JavaScript modules (import/export)
- React
- Yes
- Browser
- Answer questions about your style
- JSON
- Spaces
- Double
- Windows
- Yes
- Yes
- yarn

O seu arquivo `.eslintrc.json` será gerado de acordo com as suas respostas.

Vamos instalar as dependências do Prettier:
```cmd
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

 Com tudo instalado, faremos algumas modificações no arquivo `.eslintrc.json` para ficar desse jeito:
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "ignorePatterns": ["tsconfig.node.json"],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"]
      }
    ]
  }
}
```

No `tsconfig.json` vamos modificar o **include**:
```json
  "include": [".eslintrc.json", "src"],
```

Pronto! Agora cada vez que você salvar o projeto ou formatar/identar ele, o código irá ficar no padrão do ESLint.

### Redux Toolkit

Vamos começar instalando ele para o react:

```cmd
yarn add @reduxjs/toolkit react-redux
```

Crie um arquivo `src/redux/store.ts` e adicione o seguinte códgo para criar o store inicial:

```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

// Infere os tipos `RootState` e `AppDispatch` do próprio store
export type RootState = ReturnType<typeof store.getState>
// Exemplo de tipo inferido: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

No arquivo `App.tsx` adicione o Provider buscando o store.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { store } from "./app/store"; // adicione essa linha
import { Provider } from "react-redux"; // adicione essa linha
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}> {/* adicione essa linha */}
      <App />
    </Provider> {/* adicione essa linha */}
  </React.StrictMode>
);
```

Dentro da pasta `redux` você deve adicionar uma pasta para cada feature, nesse exemplo vamos usar o `todo`, dentro dele devemos criar o `todoSlice.ts`:

```ts
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
```

Você pode adicionar as tipagens na mesma página, mas eu preferi adicionar eu um arquivo `types.ts`: 
```ts
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
```

Adicione o reducer no store.
```ts
import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todo/todoSlice"; // Adicione essa lina

export const store = configureStore({
  reducer: {
    todoReducer, // Adicione essa lina
  },
});

// Infere os tipos `RootState` e `AppDispatch` do próprio store
export type RootState = ReturnType<typeof store.getState>;
// Exemplo de tipo inferido: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

Para usar a função:
```tsx
import { useState } from "react";
import { Plus } from "phosphor-react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from "./components/Header";
import { TextInput } from "./components/TextInput";
import { TodoList } from "./components/TodoList";

import { RootState } from "./redux/store"; // Adicione essa linha
import { createTodo } from "./redux/todo/todoSlice"; // Adicione essa linha

export function App() {
  const dispatch = useDispatch(); // Adicione essa linha
  const { todos } = useSelector((state: RootState) => state.todoReducer); // Adicione essa linha

  const [newTodo, setNewTodo] = useState("");

  function handleCreateTodo(title: string) {
    dispatch(createTodo({ title })); // Adicione essa linha

    setNewTodo("");
  }

// ... Resto do código
```