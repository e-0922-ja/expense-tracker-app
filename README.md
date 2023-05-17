# Preparation

If you don't have Supbase CLI, please install it.

```bash
brew install supabase/tap/supabase
```

# Installation

1. Clone this repository.

```bash
git clone https://github.com/e-0922-ja/expense-tracker-app.git
```

2. Install dependencies.

```bash
cd frontend
npm i

cd backend
yarn install
```

# How to use

## Run the application

1. Use the following command to start the application.

```bash
pwd
# /path/to/expense-tracker-app

# Start supbase
supbase start

# Migrate database from backend
cd backend
npx prisma migrate dev
cd ..

# Start frontend
cd frontend
npm run start
```

2. Access the application at

- [Frontend]http://localhost:3000
- [Supabase]http://localhost:54321

## Run the edge functions

```bash
supabase functions serve --no-verify-jwt
```

For example, you can fetch users by the following command.

```bash
curl localhost:54321/functions/v1/users
```

## Frontend Test

```bash
cd frontend
npm test
```
