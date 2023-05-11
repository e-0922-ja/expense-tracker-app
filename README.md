# Preparation

If you don't have docker and docker-compose, please install them.

```bash
brew install docker docker-compose
```

# Installation

1. Clone this repository.

```bash
git clone https://github.com/e-0922-ja/expense-tracker-app.git
```

2. Build and run backend containers. After executing this command, you can access the app at http://localhost:8000.

```bash
docker-compose build
docker-compose up
```

```bash
docker-compose run backend npx prisma migrate dev --name init
```

3. Run the frontend. After executing this command, you can access the app at http://localhost:3000.

```bash
cd frontend
npm run start or yarn start
```

4. Run the edge functions

```bash
supabase functions serve --no-verify-jwt
```

For example, you can fetch users by the following command.

```bash
curl localhost:54321/functions/v1/users
```
