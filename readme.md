### Nesse projeto vamos ver muitas funcionalidades do React. Vamos usar as seguintes tecnologias:

- Vite
- TailWind

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