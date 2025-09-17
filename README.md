# Bar Manager API

A robust REST API for managing a bar, built with modern TypeScript stack including Express, Better Auth, Drizzle ORM, and PostgreSQL.

## 📊 Current Version

**Version**: 1.0.0  
**Last Updated**: September 2025  
**Node.js**: v18+  
**Database**: PostgreSQL (Neon compatible)

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
├── db/
│   ├── index.ts         # Database connection setup
│   └── schema.ts        # Drizzle database schema
├── lib/
│   └── utils.ts         # Utility functions
└── middlewares/
    └── auth.ts          # Authentication middleware
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (or Neon PostgreSQL)
- pnpm package manager

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=4000
   DATABASE_URL="postgresql://username:password@localhost:5432/bar_manager"

   # Admin user (optional - for automatic admin creation)
   ADMIN_EMAIL="admin@example.com"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your_secure_password"

   # Better Auth configuration
   BETTER_AUTH_SECRET="your_secret_key_here"
   BETTER_AUTH_URL="http://localhost:4000"
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

   The development server uses **nodemon** for automatic restart on file changes. It watches:

   - All files in the `src/` directory
   - TypeScript (`.ts`), JavaScript (`.js`), and JSON (`.json`) files
   - Automatically restarts when changes are detected

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

- `POST /api/auth/sign-in` - User sign in (email/password)
- `POST /api/auth/sign-in/username` - User sign in (username/password)
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User sign out
- `GET /api/auth/session` - Get current session
- And other Better Auth standard endpoints

### Admin User

The application automatically creates an admin user on startup if the required environment variables are set:

- `ADMIN_EMAIL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## 🔧 Available Scripts

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `pnpm dev`         | Start development server with auto-restart (nodemon) |
| `pnpm build`       | Build the TypeScript project                         |
| `pnpm start`       | Start production server                              |
| `pnpm db:generate` | Generate database migrations from schema changes     |
| `pnpm db:push`     | Push schema changes directly to database             |
| `pnpm db:migrate`  | Apply pending migrations to database                 |
| `pnpm db:studio`   | Open Drizzle Studio for database management          |
| `pnpm db:drop`     | Drop database tables (destructive operation)         |
| `pnpm db:check`    | Check for schema inconsistencies                     |
| `pnpm db:up`       | Apply all pending migrations                         |

## 📡 API Endpoints

### Base Endpoint

- `GET /` - Health check endpoint returning server status

### Authentication

- `ALL /api/auth/*` - Better Auth endpoints for authentication

### Middleware

The API includes custom middleware for:

- Authentication verification
- CORS handling
- Request parsing

## 🏗️ Development

### Auto-Restart Development Server

The development server is configured with **nodemon** for automatic restart on file changes:

- **Configuration**: `nodemon.json` in the root directory
- **Watched directories**: `src/` folder
- **File types**: `.ts`, `.js`, `.json` files
- **Ignored files**: Test files (`.spec.ts`, `.test.ts`)
- **Environment**: Automatically sets `NODE_ENV=development`

Simply run `pnpm dev` and the server will restart automatically whenever you save changes to any watched files.

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

- **Routes**: Add new routes in `src/index.ts`
- **Database Schema**: Extend database schema in `src/db/schema.ts`
- **Authentication**: Modify authentication config in `src/auth.ts`
- **Middleware**: Add custom middleware in `src/middlewares/`
- **Utilities**: Add helper functions in `src/lib/utils.ts`

### Project Features

- **CORS Support**: Configured for cross-origin requests
- **Environment Variables**: Secure configuration with dotenv
- **Auto-restart**: Development server with nodemon
- **TypeScript**: Full TypeScript support with type checking
- **Database Management**: Complete Drizzle ORM integration
- **Authentication**: Robust auth system with Better Auth
- **Admin User**: Automatic admin user creation

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and `DATABASE_URL` is correct
2. **Admin User Creation**: Check that all admin environment variables are set
3. **Port Conflicts**: Default port is 4000, change the `PORT` environment variable if needed
4. **Better Auth Secret**: Ensure `BETTER_AUTH_SECRET` is set for production
5. **CORS Issues**: Check that your frontend URL is properly configured in the CORS settings

### Logs

The server provides helpful console output for:

- Server startup status and port information
- Admin user creation status
- Database connection issues
- Authentication attempts
- API request logging

### Development Tips

- Use `pnpm db:studio` to visually inspect and manage your database
- Check the terminal output for detailed error messages
- Use the `api.rest` file for testing API endpoints during development
- Enable TypeScript strict mode for better code quality

---

## 📄 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
