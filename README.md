# REST API

A Node.js + Express backend for managing tasks with authentication, role-based authorization, PostgreSQL persistence, email-based OTP flows, soft-deletion recovery, and real-time task notifications.

## Overview

This project is a full task management API built for user and admin workflows. It includes:

- user signup, login, logout, and token refresh
- email verification with OTP
- password reset via OTP
- account soft-delete and recovery flow
- task CRUD with filtering and pagination
- role-based authorization
- Socket.IO event notifications
- scheduled cleanup of deleted records
- automatic PostgreSQL schema and table creation on startup

## Tech stack

- Node.js
- Express
- PostgreSQL
- Socket.IO
- JWT authentication
- bcrypt
- PostgreSQL connection pooling via pg
- PgBoss for scheduled jobs
- Nodemailer for OTP/email sending
- express-rate-limit
- cookie-parser
- Zod-style validation patterns through custom middleware

## Features

- Secure auth with access and refresh tokens stored in HTTP-only cookies
- Admin assignment based on `ADMIN_EMAIL`
- Email verification workflow with OTP generation and expiry
- Password reset workflow with OTP verification
- Soft-deleted account recovery window
- Task creation, list, update, delete, and restore operations
- Task filtering by status and pagination support
- role-based access controls for user and admin
- Socket.IO event for new task creation
- automated cleanup of expired soft-deleted records and permanent deletions
- startup initialization that creates the required schema and tables

## Project structure

```text
task-manager-backend/
  index.js
  package.json
  README.md
  cache/
  controllers/
  db/
  errorHandlers/
  init/
  middlewares/
  queries/
  routes/
  services/
  utils/
  websocket/
  worker/
```

## Requirements

- Node.js 18+
- PostgreSQL database
- SMTP-capable email provider for sending OTP emails
- npm

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root.

3. Start the server in development mode:

```bash
npm run dev
```

## Environment variables

Add the following values to a `.env` file:

```env
PORT=your_server_port
PG_URL=postgresql://username:password@host:5432/database
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ADMIN_EMAIL=admin@example.com
SENDER_EMAIL=your_sender_email@gmail.com
SENDER_PASSWORD=your_app_password
EMAIL_QUEUE=email-queue
TASKS_QUEUE=tasks-cleanup-queue
NODE_ENV=development
```

### Variable notes

- `PG_URL` is used to connect to PostgreSQL.
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` sign access and refresh tokens.
- `ADMIN_EMAIL` assigns the first matching email to the `admin` role during signup.
- `SENDER_EMAIL` and `SENDER_PASSWORD` are used by Nodemailer to send OTP/account emails.
- `EMAIL_QUEUE` handles outbound email jobs.
- `TASKS_QUEUE` handles the scheduled cleanup job.
- The app creates the required schema and tables automatically on startup.

## Authentication and account routes

Base URL: `/api/auth`

### Signup

- `POST /api/auth/signup`
- Body:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

- Behavior:
  - creates the user
  - assigns `admin` if email matches `ADMIN_EMAIL`
  - sets access and refresh tokens in cookies

### Login

- `POST /api/auth/login`
- Body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Logout

- `POST /api/auth/logout`
- Clears auth cookies

### Refresh token

- `POST /api/auth/refresh`
- Validates refresh token and issues a new access and refresh token pair

### Send verification OTP

- `POST /api/auth/send-verify-otp`
- Requires valid access token
- Sends an OTP for account verification

### Verify email

- `POST /api/auth/verify-email`
- Requires valid access token
- Verifies the OTP and updates account status

## Password reset routes

Base URL: `/api/account/reset`

### Send reset OTP

- `POST /api/account/reset/send-reset-otp`
- Verifies the user exists by email and sends a reset OTP

### Update password

- `POST /api/account/reset/update-password`
- Validates password reset input and OTP
- Updates the stored password and confirms the action

## Account deletion and recovery routes

### Delete account

- `DELETE /api/account/delete/soft-delete`
- Soft-deletes the authenticated user account
- User can recover the account within the configured recovery period

### Recover deleted account

- `POST /api/account/recover/send-recovery-otp`
- Sends recovery OTP if the user account is in deleted state

- `POST /api/account/recover/verify-restored-account`
- Validates the recovery OTP and restores the account

## Task routes

Base URL: `/api/tasks`

All task routes require a valid auth token and user verification middleware.

### Get all tasks

- `GET /api/tasks`
- Roles: `user`, `admin`
- Query params:
  - `id`
  - `limit`
  - `updated_at`

### Get task by id

- `GET /api/tasks/:id`
- Roles: `user`, `admin`

### Get deleted tasks

- `GET /api/tasks/deleted`
- Roles: `admin`
- Query params:
  - `id`
  - `limit`
  - `deleted_at`

### Get deleted task by id

- `GET /api/tasks/deleted/:id`
- Roles: `admin`

### Get tasks by status

- `GET /api/tasks/status`
- Roles: `user`, `admin`
- Query params:
  - `id`
  - `limit`
  - `updated_at`
  - `status` (for example: `todo`, `in progress`, `done`)

### Create task

- `POST /api/tasks`
- Roles: `admin`
- Body:

```json
{
  "header": "Project kickoff",
  "text": "Set up the initial sprint backlog and assign tasks."
}
```

- Emits a Socket.IO `add_todo` event after creation

### Update task

- `PUT /api/tasks/:id`
- Roles: `admin`
- Updates a task by ID
- Emits a Socket.IO `update_todo` event after creation

### Delete task

- `DELETE /api/tasks/:id`
- Roles: `admin`
- Soft-deletes the task
- Emits a Socket.IO `delete_todo` event after creation

### Restore task

- `PATCH /api/tasks/restore/:id`
- Roles: `admin`
- Restores a soft-deleted task
- Emits a Socket.IO `restore_todo` event after creation

## Authorization model

Roles used by the app:

- `user`
  - can fetch tasks and filter by status
- `admin`
  - can create, update, delete, restore tasks
  - can access deleted tasks
  - can manage account verification and related flows

## WebSocket support

The backend runs a Socket.IO server and emits events such as:

- `add_todo` when a new task is created
- `update_todo` when an existing task is updated
- `delete_todo` when an existing task is deleted
- `restore_todo` when a deleted task is restored

This is useful for realtime front-end updates when the task list changes.

## Scheduled jobs

The application starts a cleanup service on initialization.

- `PgBoss` creates a queue and schedules a recurring cleanup task
- It runs periodic cleanup for deleted tasks and deleted user records
- The cleanup process deletes permanently expired records after the soft-deletion policy window

## Rate limiting

The app includes request throttling for sensitive routes:

- auth endpoints
- task endpoints
- password reset endpoints
- delete-account endpoints
- recovery-account endpoints

## Database behavior

On server startup, the app connects to PostgreSQL and creates:

- the `todo_app` schema
- the `users` table
- the `tasks` table

The schema includes:

- OTP and expiry fields for email verification/reset/recovery
- account soft-delete fields (`is_deleted`, `deleted_at`)
- task soft-delete fields (`is_deleted`, `deleted_at`)
- role enforcement and validation constraints

## Notes

- Access tokens are short-lived and refresh tokens are long-lived.
- Auth cookies are HTTP-only and secure in production.
- The backend uses rate limiting to slow abusive or repeated requests.
- Email sending is queued for later processing through the mail worker.
- Cleanup and email jobs are managed by `pg-boss`.

## Common commands

```bash
npm install
npm run dev
```

## Future improvements

Possible enhancements include:

- frontend integration with the API
- more granular permission checks
- audit logs for task actions
- broader test coverage with unit and integration tests
- clearer API documentation with Swagger/OpenAPI
