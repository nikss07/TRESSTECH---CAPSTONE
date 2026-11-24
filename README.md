# TressTech

TressTech is a cross-platform salon hair-assessment and chemical-safety support application for stylists. It is designed to guide a consultation from client selection and hair-photo capture through hair-profile review, desired-color selection, formula guidance, and aftercare.

The project currently provides a user-interface prototype. Dashboard records, reports, authentication, and analysis results use sample or in-memory data; the mobile screens are not yet connected to the PostgreSQL database. The database schema and migration workflow are included for backend development. Recommendations are decision support only and do not replace a stylist's professional judgment, strand testing, or product instructions.

## Features

- Staff-facing dashboard, client list, client profiles, and report history.
- Client selection and sample client creation for a new consultation.
- Camera capture and photo-library upload flows, including image-quality checks.
- Hair-profile and desired-color screens, with example formula and aftercare guidance.
- PostgreSQL schema migrations in `backend/migrations/` for users, clients, hair analyses, treatment records, chemical-safety references, and recommendations.
- Android, iOS, and web targets powered by Expo.

## Technology

- Expo SDK 58 and Expo Router
- React Native, React Native Web, and TypeScript
- PostgreSQL and `node-pg-migrate`

## Prerequisites

- Node.js 22.13 or a later Node.js release supported by the installed Expo SDK. The backend database-creation script uses Node's built-in TypeScript type stripping.
- npm
- A PostgreSQL server and a database role with permission to create databases, if you plan to initialize the database locally.
- Android Studio for an Android emulator, or macOS with Xcode for an iOS simulator. You can also run the web target.

## Getting started

1. Install the mobile app dependencies from the repository root:

   ```bash
   npm install
   ```

2. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Configure `backend/.env`. Start from `backend/.env.example` and set `DATABASE_URL` to a PostgreSQL connection string whose path is the target database name. `DB_NAME` is optional; when set, it must match the database name in the URL.

   Replace the example credentials and host with your own PostgreSQL settings. The backend `.env` file is ignored by Git; do not commit real credentials.

4. If you are setting up the database, create it and apply the schema from the `backend` directory:

   ```bash
   npm run db:create
   npm run migrate
   ```

   `db:create` connects to the PostgreSQL maintenance database named `postgres`, using the host and credentials from `DATABASE_URL`. The database role must be allowed to create databases. If your provider does not allow creating databases through this connection, create the database through the provider's tools, then run `npm run migrate`. Migration files are stored in `backend/migrations/`.

5. Return to the repository root and start the mobile app:

   ```bash
   cd ..
   npm start
   ```

   Use the Expo CLI prompts to open a platform, or start a specific target:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

Database setup is needed for the PostgreSQL schema and migration workflow; the current sample UI can be explored independently of persisted database records.

## Backend database commands

Run these commands from the `backend` directory.

| Command | Description |
| --- | --- |
| `npm run db:create` | Create the database named by `DB_NAME` or the database path in `DATABASE_URL`. Does nothing if it already exists. |
| `npm run migrate` | Apply pending migrations. |
| `npm run migrate:down` | Roll back the most recently applied migration. Use with care. |
| `npm run migrate:create -- <migration-name>` | Generate a migration file in `backend/migrations/`. |

## Backend API structure

The backend uses Express with a layered structure. Start it from the `backend` directory with `npm start`. The database-backed health endpoint is available at `GET http://localhost:3000/api/v1/health`.

- `src/routes/` maps HTTP paths and methods to controllers.
- `src/controllers/` handles HTTP input and response formatting.
- `src/services/` contains business workflows and application rules.
- `src/repositories/` contains database queries and persistence access.
- `src/config/` holds shared configuration, including the PostgreSQL connection pool.
- `src/middleware/` contains shared request and error handling.
- `src/validators/` is for request validation schemas.
- `src/utils/` is for small, reusable helpers.

Keep feature behavior in services, SQL in repositories, and HTTP-specific concerns in controllers and routes.

Use the reusable HTTP errors in `src/utils/error.js` (for example, `throw new NotFoundError('Client not found.')`). The error middleware returns safe client messages and codes, while logging server errors without exposing their details.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
```

## Project structure

```text
assets/       App images, icons, and other static assets
backend/
  .env.example  Backend environment variable template
  create_database.ts Database creation utility
  package.json Backend scripts and dependencies
  package-lock.json Locked backend dependencies
  migrations/ PostgreSQL schema migrations
  src/
    app.js        Express app configuration
    server.js     HTTP server entry point
    config/       Database and application configuration
    controllers/  HTTP request handlers
    middleware/   Shared request and error middleware
    repositories/ Database queries
    routes/       API route definitions
    services/     Business logic
    utils/        Shared helpers
    validators/   Request validation schemas
src/
  app/        Expo Router routes and screens
  components/ Reusable UI and feature components
  constants/  Shared theme and design constants
  hooks/      Reusable React hooks
  lib/        Database utilities
  utils/      Shared utility functions
```
