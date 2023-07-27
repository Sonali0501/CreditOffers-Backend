# Credit Card Offers Management Application Backend

Application Schema

```
Customer (name, phone, email, created_at, updated_at)
Account (customer_id, account_limit, per_transaction_limit, last_account_limit, last_per_transaction_limit, account_limit_update_time, per_transaction_limit_update_time, created_at, updated_at)
Offer (account_id, limit_type, new_limit, activation_time, expiry_time, status, created_at, updated_at)
```

This application contains below APIs

**Accounts**

```
1. POST /api/v1/account
    - handles creation of a new account

2. GET /api/v1/account?id=<>
    - retrieves account details of given account id
```

**Offers**

```
1. POST /api/v1/offer
    - handles creation of a new offer

2. GET /api/v1/offer?accountId=<>&activeDate=<>
    - retrieves list of active offers for given accountId

3. PUT /api/v1/offer
    - handled acceptance or rejection of offers
    - updates account limits based on offer details in case of acceptance
```

Note:- Any functionalities related to Customer are not a part of this application, it is just kept to be referenced in Account.

## Local project setup

### Database Setup

1. install and configure PostgreSQL
2. create a database

```
CREATE DATABASE creditcards;
```

### Environment Variables

create `.env` file in the root directory with the below content

```
NODE_ENV=development
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=newuser
DB_PASS=password
DB_NAME=creditcards
API_KEY=apikey
```

### Installing dependencies

```
npm install
```

### Starting server

```
npm run dev
```
