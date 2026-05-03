# Firebase Auth

Aplicação React simples com cadastro, login, página principal e logout usando Firebase Authentication e Firestore.

## Como rodar

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` na raiz do projeto usando o `.env.example` como modelo:

```bash
cp .env.example .env
```

Preencha o `.env` com os dados do seu app Web do Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

Rode o projeto:

```bash
npm run dev
```

## Configuração do Firebase

1. Acesse o Firebase Console.
2. Crie um projeto ou use um projeto existente.
3. Em Authentication, ative o provedor E-mail/Senha.
4. Em Firestore Database, crie um banco de dados.
5. Em Configurações do projeto, crie um app Web.
6. Copie os dados do firebaseConfig para o arquivo `.env`.

Regras básicas para o Firestore:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Build

```bash
npm run build
```

Para visualizar o build local:

```bash
npm run preview
```

## Deploy no GitHub Pages

O projeto já tem o workflow em `.github/workflows/deploy.yml`.

No GitHub, crie estes secrets no repositório em Settings > Secrets and variables > Actions:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Depois ative o GitHub Pages:

1. Vá em Settings > Pages.
2. Em Source, selecione GitHub Actions.
3. Faça push na branch `main`.

A URL ficará neste formato:

```text
https://seu-usuario.github.io/firebase-auth/
```
