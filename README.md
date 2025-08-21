# Bar Manager API

A robust REST API for managing a bar, built with modern TypeScript stack including Express, Better Auth, Drizzle ORM, and PostgreSQL.

## 🚀 Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── auth.ts              # Better Auth configuration
├── index.ts             # Main server entry point
└── db/
    ├── index.ts         # Database connection setup
    └── schema.ts        # Drizzle database schema
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- pnpm package manager

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/bar_manager"

   # Admin user (optional - for automatic admin creation)
   ADMIN_EMAIL="admin@example.com"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your_secure_password"
   ```

3. **Database Setup:**

   ```bash
   # Generate initial database migration
   pnpm db:generate

   # Apply migrations to your database
   # (Run your migration SQL files against your PostgreSQL database)
   ```

4. **Development Server:**

   ```bash
   pnpm dev
   ```

5. **Production Build:**
   ```bash
   pnpm build
   pnpm start
   ```

## 🗄️ Database Schema

The current schema includes authentication tables managed by Better Auth:

- **users**: User accounts with email/username authentication
- **sessions**: User session management
- **accounts**: OAuth and authentication provider accounts

## 🔐 Authentication

Authentication is powered by **Better Auth** with the following features:

### Configuration (`src/auth.ts`)

- **Database Adapter**: Drizzle ORM with PostgreSQL
- **Email & Password**: Authentication enabled (no email verification required)
- **Username Plugin**: Supports username-based login
- **Session Management**:
  - Sessions expire in 8 hours
  - Session updates every 24 hours

### API Endpoints

All authentication endpoints are available under `/api/auth/*`:

- `/api/auth/sign-in` - User sign in
- `/api/auth/sign-up` - User registration
- `/api/auth/sign-out` - User sign out
- And other Better Auth standard endpoints

### Admin User

The application automatically creates an admin user on startup if the required environment variables are set:

- `ADMIN_EMAIL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## 🔧 Available Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm dev`         | Start development server with hot reload         |
| `pnpm build`       | Build the TypeScript project                     |
| `pnpm start`       | Start production server                          |
| `pnpm db:generate` | Generate database migrations from schema changes |
| `pnpm db:push`     | Push schema changes directly to database         |
| `pnpm db:migrate`  | Apply pending migrations to database             |
| `pnpm db:studio`   | Open Drizzle Studio for database management      |
| `pnpm db:drop`     | Drop database tables (destructive operation)     |
| `pnpm db:check`    | Check for schema inconsistencies                 |
| `pnpm db:up`       | Apply all pending migrations                     |

## 📡 API Endpoints

### Base Endpoint

- `GET /` - Health check endpoint returning "Hello, world!"

### Authentication

- `ALL /api/auth/*` - Better Auth endpoints for authentication

## 🏗️ Development

### Database Management

After making changes to the schema in `src/db/schema.ts`, you have several options:

#### Option 1: Migration-based approach (Recommended for Production)

1. **Generate migration files:**

   ```bash
   pnpm db:generate
   ```

2. **Apply migrations:**
   ```bash
   pnpm db:migrate
   ```

#### Option 2: Direct schema push (Good for Development)

1. **Push schema changes directly:**
   ```bash
   pnpm db:push
   ```
   _This directly updates your database schema without generating migration files_

#### Option 3: Database Studio

1. **Open Drizzle Studio for visual management:**
   ```bash
   pnpm db:studio
   ```
   _Opens a web interface at `https://local.drizzle.studio` for database exploration_

#### Useful Database Commands

- **Check schema consistency:** `pnpm db:check`
- **Apply all pending migrations:** `pnpm db:up`
- **Reset database (⚠️ DESTRUCTIVE):** `pnpm db:drop`

### Adding New Features

The project structure supports easy extension:

- Add new routes in `src/index.ts`
- Extend database schema in `src/db/schema.ts`
- Modify authentication config in `src/auth.ts`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and `DATABASE_URL` is correct
2. **Admin User Creation**: Check that all admin environment variables are set
3. **Port Conflicts**: Change the `PORT` environment variable if 3000 is in use

### Logs

The server provides helpful console output for:

- Server startup status
- Admin user creation status
- Database connection issues
