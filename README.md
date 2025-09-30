## REST API with Node.js, Express, TypeScript & MongoDB

#### A simple REST API built with **Node.js, Express, MongoDB, and TypeScript**, featuring user authentication, protected routes, and user management endpoints. This project is designed as a learning exercise to understand backend concepts such as middleware, authentication, and CRUD operations.

## Features

- **User registration** with email, username, and password.

- **User login** with session tokens stored in HTTP-only cookies.

- **Authentication middleware** (`isAuthenticated`) to protect routes.

- **Authorization middleware** (`isOwner`) to ensure users can only modify their own data.

- **User CRUD endpoints**:

  - `GET /users` → Get all users (authenticated)

  - `PATCH /users/:id` → Update own username

  - `DELETE /users/:id` → Delete own account

- Built with **TypeScript** for type safety and maintainability.

## Project Structure

```
src
├── controllers
│ ├── authentication.ts # Login & register functions
│ └── users.ts # User-related endpoints (CRUD)
├── db
│ └── users.ts # MongoDB User schema & helper functions
├── env.ts # Environment variable loader
├── helpers
│ └── index.ts # Crypto helpers (hashing, random tokens)
├── index.ts # Express app entry point
├── middlewares
│ └── index.ts # isAuthenticated & isOwner middleware
├── router
  ├── authentication.ts # Auth routes
  ├── users.ts # User routes
  └── index.ts # Combines all routers
```

## How It Works

### Authentication Flow

1. **User registers** via `POST /auth/register`

2. **User logs** in via `POST /auth/login`

3. **Server sets cookie** `LIMON-AUTH` with session token

4. On future requests, **middleware reads cookie**, verifies the user, and attaches user info to `req.identity`

### Authorization Flow (Protected Routes)

- **Middleware** stack for `/users/:id` routes:

  1. `isAuthenticated` → checks session cookie and sets `req.identity`

  2. `isOwner` → ensures the logged-in user can only modify their own resource

- **Controller** executes only if both middleware pass:

  - Example: `PATCH /users/:id` updates username

  - Example: `DELETE /users/:id` deletes the user

## API Endpoints

### Auth Routes

- `POST /auth/register` → Register a new user
- `POST /auth/login` → Login user and set session cookie

### User Routes (Protected)

- `GET /users` → Get all users (authenticated)
- `PATCH /users/:id` → Update own username (owner only)
- `DELETE /users/:id` → Delete own account (owner only)

## Tech Stack

- **Node.js** + **Express** → server & routing
- **TypeScript** → type safety
- **MongoDB / Mongoose** → database & schemas
- **Crypto** → password hasing & token generation
- **Nodemon** → automatic dev server restart

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/sheikhlimon/backend-video
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

- `MONGO_URI` → Your MongoDB connection string

- `SECRET` → Any random string used for hashing/authentication

4. Start development server:

```bash
npm start
```

#### Make sure `.env` is in `.gitignore` to keep secrets safe

## Learning Goals

- Understand **Express middleware**: authentication, authorization, and request flow

- Practice **CRUD operations** in TypeScript + MongoDB

- Learn **session-based authentication** using cookies

- Organize a **modular backend project** with controllers, routers, middlewares, and helpers
