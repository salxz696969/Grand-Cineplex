# 🏗️ Project Architecture

This document provides a high-level overview of the architectural structure and design principles used in this application.

---

## 🔧 Tech Stack

### Frontend (Client)

- **React**
- **Axios**
- **Tailwind CSS**

### Backend (Server)

- **Express**
- **PostgreSQL**
- **Sequelize ORM** – Type-safe SQL ORM (current)
- **Firebase, JWT or session-based auth (TBD)**

---

## 📖 Architectural Style

The app follows a **modular, layered architecture**, emphasizing separation of concerns and maintainability across both frontend and backend codebases.

---

### 🧩 Frontend – React (Client)

#### 📁 `components/`

This folder holds all reusable UI elements, categorized into:

- `common/`: Global shared components like `Button`, `Input`, `Modal`, etc.
- `pageX/`: Components specific to a given page (`Home`, `Dashboard`, etc.).

#### 📁 `pages/`

Page-level components that represent full views in the app. Each page may fetch data and render relevant components. Example: `Login.tsx`, `MovieList.tsx`, `BookingPage.tsx`.

#### 📁 `assets/`

Static files like images, icons, logos, or SVGs.

#### 📁 `api/`

Holds functions to interact with the backend. Encapsulates API logic and can define services like `getMovies()`, `bookSeat(id)` etc.

#### 📁 `utils/` _(planned)_

Helper functions, constants, formatting tools, and hooks (`useDebounce`, `formatDate`, etc.).

---

### 🖥️ Backend – Express (Server)

#### 📁 `db/`

Database configuration and schema definitions:

- `models/`: Sequelize model definitions (current)
- `index.ts`: Sequelize connection and configuration
- `schema/`: Drizzle schema definitions (legacy, for reference)

#### 📁 `app/`

Role-based modules for route and controller organization:

- `customer/`: Customer-facing routes and controllers
- `cashier/`: Cashier-facing routes and controllers
- `manager/`: Manager/admin routes and controllers

Each role has its own `routes/` (with an `index.ts` that combines subroutes) and `controllers/`.

#### 📁 `middleware/`

Reusable Express middleware for things like:

- Request logging
- Error handling
- Authentication/authorization
- Input validation

#### 📁 `controllers/`

Contains core application logic (business rules). This layer abstracts operations like filtering data, validating input, or applying transformations. 

#### 📁 `shared/`

Contains shared utilities, types, and helpers used across the backend.

#### 📄 `app.ts`

Sets up the Express app: loads middleware, connects to the database, sets up CORS, and mounts routes. **Only base role prefixes are registered here** (e.g., `/customer`, `/cashier`, `/manager`). Each role's `routes/index.ts` handles its own subroutes, keeping the main app entry clean and modular.

#### 📄 `server.ts`

Entry point that starts the server (e.g., `app.listen()`).

---

## 🧑‍💻 Summary Table

| Layer / Folder | Purpose                                        |
| -------------- | ---------------------------------------------- |
| `components/`  | Reusable building blocks for UI                |
| `pages/`       | Views/screens rendered by routes               |
| `db/`          | Database configuration and models (Sequelize)  |
| `app/`         | Role-based route/controller modules            |
| `middleware/`  | Request preprocessing (auth, validation, etc.) |
| `controllers/` | Business logic and rules                       |
| `shared/`      | Shared utilities, types, and helpers           |
| `layouts/`     | Page layout wrappers for UI consistency        |
| `api/`         | Functions to talk to backend from frontend     |

---

## 🔄 Data Flow Overview

```
+---------------------+
|  🖥️ User Interaction|
|     (React UI)      |
+----------+----------+
           |
           v
+----------+----------+
| 🌐 API Call (Axios) |
+----------+----------+
           |
           v
+----------+----------+
|  🛠️ Express Route   |
+----------+----------+
           |
           v
+----------+----------+
| 🧑‍💻 Controller Logic |
+----------+----------+
           |
           v
+----------+----------+
| 🗄️ Sequelize ORM    |
+----------+----------+
           |
           v
+----------+----------+
| 📄 PostgreSQL DB    |
+----------+----------+
           |
           v
+----------+----------+
| 📦 Response Data    |
+----------+----------+
           |
           v
+----------+-----------+
| 🔄 Update React State|
|    (Re-render UI)    |
+----------+-----------+
```

---

## ✅ Goals

- Maintainability and scalability
- Separation of concerns
- Type safety with Sequelize ORM (and Drizzle legacy)
- Ease of testing and debugging

---

> 📌 Note: As the project evolves, this document will be updated to reflect more specific architectural decisions.
