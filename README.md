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

2. Build and run backend containers. After executing this command, you can access the app at http://localhost:8000.

```bash
supabase start
docker-compose build
docker-compose up
```

```bash
docker-compose exec backend npx prisma migrate dev
```

3. Run the frontend. After executing this command, you can access the app at http://localhost:3000.

```bash
cd frontend
npm run start or yarn start
```
