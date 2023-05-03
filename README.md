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

2. Build and run containers.

```bash
docker-compose build
docker-compose up
```

```bash
docker-compose run backend npx prisma migrate dev --name init
```
