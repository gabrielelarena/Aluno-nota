<div align="center">

  <h1 align="center"><strong>SISTEMA PARA CALCULAR MÉDIA DE ALUNOS</strong></h1>
  <p align="center">
	 Este é um projeto completo desenvolvido em TypeScript + Banco de Dados. <br>
  </p>

</div>

<br />

## :computer: Tecnologias

Este projeto foi desenvolvido com as seguintes ferramentas: 
<br><br>
[![My Skills](https://skillicons.dev/icons?i=typescript,docker,postgres&theme=dark)](https://skillicons.dev) 

</div>

<br> 

### 📄 Arquivos 

- package.json - Gerencia as dependências e scripts do projeto.
- package-lock.json - Garante que os pacotes sejam sempre os mesmos.
- tsconfig.json - Configurações do TypeScript.
- .env - Usado para armazenar a URL de Conexão com Banco de Dados.
- alunos.ts - Recebe as notas dos alunos, calcula a média e armazena no Banco de Dados.
- index.ts - Lê os valores inseridos e avisa se algo não estiver correto.
- db.ts - Lê a URL do arquivo .env e retorna no console se a conexão com o banco é estabelecida.
- types.ts - Define a interface Aluno, que descreve a estrutura dos dados de um aluno (nome, idade, série e notas).
  
<br>

## ⚙️ Recursos 

* **Entrada**: Nome, Idade, Série e Notas: Matemática, História, Geografia.
* **Armazenamento**: Nome, Idade, Série e Média de cada matéria.
* **Saída**: Retorna se a Conexão foi concluída ou não.

<br>

## 📁 Estrutura de pastas

```
backend/
├─ dist/          # arquivos .js gerados pelo TypeScript
    ├─ routes # guarda o arquivo (após a transpilaçâo) que armazena a url de conexão.
├─ src/           # código-fonte .ts (ex.: ts/index.ts) e conexões do banco.
    ├─ routes # guarda o arquivo que armazena a url de conexão.
├─ node_modules/  # armazena as dependências externas
├─ package.json
├─ package-lock.json
└─ tsconfig.json
```

<br> 

## 🔧 Pré-requisitos

* **Node.js 16+** (recomendado 18 ou 20)
* **Npm**
* **Docker**
* **Visual Studio Code**
* **PgAdmin4**
* **Bibliotecas pg, express, dotenv**

<br>

## 🚀 Instalação

Na **raiz** do projeto (onde está o `package.json`):

```bash
npm i -D typescript ts-node @types/node
```

Crie (ou confira) os scripts no **package.json**:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

Após isso, instale as bibliotecas:

```bash
npm install --save-dev @types/express @types/pg @types/dotenv
```

Seu arquivo deverá estar assim: 

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/dotenv": "^6.1.1",
    "@types/express": "^5.0.4",
    "@types/node": "^24.9.1",
    "@types/pg": "^8.15.5",
    "node-dev": "^8.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "pg": "^8.16.3"
  }
}
```

`tsconfig.json` mínimo recomendado:

```json
{
  "compilerOptions": {
    // Caminhos dos arquivos
    "rootDir": "./src",
    "outDir": "./dist",

    // Ambiente Node.js
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "types": ["node"],

    // Saídas e mapas
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Regras de tipagem
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Compatibilidade e performance
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src", "src/index.ts"]
}
```

> No VS Code, se aparecerem erros de tipos do Node, use **Ctrl+Shift+P → TypeScript: Restart TS Server**.

<br>

## ▶️ Como executar

Transpilar e rodar o JS gerado:

```bash
npx ts-node src/index.ts
```


## 🖥️ Uso 

1. **Entrada** → informe **Nome**, **CPF**, **Telefone**, **Pizzas**, **Bebidas**, **Modo de Entrega**, **Forma de Pagamento** e **Endereço**. O sistema grava em `cadastro.csv`.
2. **Saída** → O Sistema calcula o preço dos produtos escolhidos e cria a nota fiscal do pedido. O sistema grava em `pedidos.csv`.

<br>

## ⌨ Autores

```
- Gabriele Larena - 2508761
- João Wagner Bonfim - 2508282
- Julia Borges - 2508413
- Maria Fernanda Venda - 2502731
```
<br>
