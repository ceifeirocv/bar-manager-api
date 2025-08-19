# Bar Manager API

This is a simple API for managing a bar, built with Express, TypeScript, Drizzle ORM, and PostgreSQL.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env` file and set the following environment variables:
   ```
   PORT=3000
   DATABASE_URL="your_database_connection_string_here"
   JWT_SECRET="your_jwt_secret_here"
   ```

3. Start the server:
   ```bash
   pnpm start
   ```

## Database Migrations

To generate database migrations, run the following command after making changes to the schema in `src/db/schema.ts`:

```bash
pnpm db:generate
```
