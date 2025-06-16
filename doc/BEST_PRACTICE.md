# 🧭 Best Practices Guide

A brief reference for maintaining consistency, readability, and scalability throughout the project.

---

## 📁 File & Folder Structure

- **Follow the given structure** (e.g., `components/`, `pages/`, `services/`, etc.).
- Group related files together by feature or function.
- **Keep components small and focused**. One component = one job.

---

## 🧩 Naming Conventions

### General

- Use **kebab-case** for folders: `movie-list`, `user-profile`
- Use **PascalCase** for React components: `MovieCard.jsx`, `UserForm.jsx`
- Use **camelCase** for variables and functions: `handleSubmit`, `fetchData`
- Use **UPPER_SNAKE_CASE** for constants: `MAX_RETRIES`, `API_URL`

### Backend

- **Schema Files**: Use singular form + `.ts` (e.g., `movies.ts`, `theaters.ts`)
- **File naming style**: Prefer `user.controller.ts`, `user.service.ts`, `user.routes.ts` for clarity.
  (`[entity].[layer].ts`)
- **Middleware**: Name based on action, e.g., `authMiddleware.ts`, `errorHandler.ts`

### Database (Drizzle)

- **Table Names**: Use plural, snake_case: `movies`, `movie_screenings`
- **Column Names**: Use snake_case: `created_at`, `updated_at`
- **Foreign Keys**: Use `entity_id` format: `movie_id`, `theater_id`
- **Enums**: Use singular form: `payment_type`, `booking_status`

---

## 📦 Module Imports

- Use **ES6 imports** (`import` / `export`) across frontend and backend.
  ✅ Yes: `import express from 'express'`
  🚫 No: `const express = require('express')`

- Avoid deep relative imports (like `../../../utils`). Use aliases or structure well.

- For Drizzle schemas, import from the index file:
  ✅ Yes: `import { movies, theaters } from '../db'`
  🚫 No: `import { movies } from '../db/schema/movies'`

---

## 💬 Commenting Guidelines

- Use comments sparingly but clearly:

  - `// TODO:` – For incomplete features or pending logic
  - `// FIXME:` – For known bugs or technical debt
  - `// NOTE:` – For clarifying why something is done a specific way
  - `// HACK:` – Temporary workaround

Example:

```js
// TODO: Replace with actual validation logic
// FIXME: This throws on empty input sometimes
```

---

## 🌐 API Layer (Frontend)

- Centralize API calls (e.g., in `api/[api].ts`) to avoid scattered logic.
- Use meaningful names like `getUserData()` or `submitBooking()`.

---

## 🎨 Components

- Use `components/common/` for shared elements like `Button`, `Modal`, `Input`.
- Use subfolders in `components/` to group page-specific components.
- Keep presentational and logic code cleanly separated if possible.

---

## 🗄️ Database (Drizzle)

- **Schema Organization**

  - Keep each table in its own file under `db/schema/`
  - Use TypeScript for type safety
  - Define relationships explicitly

- **Query Best Practices**

  - Use prepared statements (Drizzle handles this)
  - Keep queries simple and focused
  - Use transactions for multiple operations
  - Handle errors appropriately

- **Type Safety**
  - Use Drizzle's generated types
  - Define custom types in `data/types.ts`
  - Use enums for fixed sets of values

Example:

```typescript
// Good
const movie = await db
  .select()
  .from(movies)
  .where(eq(movies.id, movieId))
  .limit(1);

// Bad
const movie = await db.execute(sql`SELECT * FROM movies WHERE id = ${movieId}`);
```

---

## 🧪 Testing & Debugging

- Write minimal unit tests where critical (if applicable).
- Use clear console logs (remove before production).

```js
console.log("[User Fetch]", userData); // DEBUG:
```

---

## 🧪 Git & Version Control

## 📄 Other Notes

- Always keep `.env` for secrets — never commit `.env` or `node_modules`.
- Prefer `.tsx` for React files and `.ts` for logic/backend.
- Write clean, predictable functions — avoid side effects.
- Use Drizzle's type-safe query builder instead of raw SQL.
