### Nesse projeto vamos ver muitas funcionalidades do React. Vamos usar as seguintes tecnologias:

- Vite
- TailWind
- ESLint

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