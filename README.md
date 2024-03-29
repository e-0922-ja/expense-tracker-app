# SpendShare | Online Group Expense Tracker App

SpendShare is a comprehensive solution for managing group expenses.  
This application allows users to effortlessly split bills and track shared expenditures, promoting transparency, fairness, and convenience in all your financial transactions.

## Features
- Split Bills Evenly: Distribute expenses among your group fairly, ensuring that everyone contributes equally.
- Payment Tracking: Keep track of who has paid and who hasn't for each expense, bringing accountability to shared costs.
- Debt Management: Easily understand your financial position within the group. See who you owe money to and who owes you, providing a clear picture of your financial obligations.
- Expense History: Access previous expense records, allowing you to refer back to past transactions whenever necessary.

## Tech Stack
- **React**
- **TypeScript**
- **MUI (Material-UI)**
- **Styled-components**
- **Supabase**
- **SendGrid**

### Table Design
https://lucid.app/lucidchart/603f4685-8e92-46e9-a3c1-67b482422914/edit?beaconFlowId=4EFD9C91AE2B384E&invitationId=inv_c05db614-6c0b-4b54-871c-80b051299540&referringApp=slack&page=0_0#

## Project Members
 Yuta Kawamura  
 Akito Tobita  
 Yuki Kasugai

## Preparation

If you don't have Supbase CLI, please install it.

```bash
brew install supabase/tap/supabase
```

## Installation

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

## How to use

### Run the application

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

### Migrate database

1. Edit table schema with [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview#the-sql-editor).

2. After editing tables, run the following command to create migration files. Refer [this URL](https://supabase.com/docs/reference/cli/supabase-db-diff)

```bash
supabase db diff --file <change name>
```

For example:

```bash
supabase db diff --file add-users-table
Connecting to local database...
Creating shadow database...
Applying migration 20230602141215_add-users-table.sql...
Diffing schemas: auth,extensions,public,storage
```
-> Created supabase/migrations/20230602141215_add-users-table.sql

### Run the edge functions

1. Prepare `.env.local` file. You can copy `.env.local.example` and edit it.

```bash
cp ./supabase/.env.local.example ./supabase/.env.local
```

2. Run the following command to start the edge functions.
```bash
supabase functions serve --no-verify-jwt --env-file ./supabase/.env.local
```

3. You can access the edge functions at `http://localhost:54321/functions/v1/`.
For example, you can fetch users by the following command.
```bash
# Fetch all users
$ curl localhost:54321/functions/v1/users

# Send Friend Request Email
$ curl -i --request POST 'http://localhost:54321/functions/v1/email' \
  --data '{ "toAddress":"ytkwmr18@gmail.com", "requestee": "Yuta Kawamura" }'
```

### Prepare lint
To run lint, you need to install the husky and prettier. So please run `npm i` on root directory

### Frontend Test

```bash
cd frontend
npm test
```
