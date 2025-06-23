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
- **Drizzle ORM** - Type-safe SQL query builder
- **Firebase, JWT or session-based auth (TBD)**

---

## 📐 Architectural Style

The app follows a **modular, layered architecture**, emphasizing separation of concerns and maintainability across both frontend and backend codebases.

---

### 🧩 Frontend – React (Client)

#### 📁 `components/`

This folder holds all reusable UI elements, categorized into:

- `common/`: Global shared components like `Button`, `Input`, `Modal`, etc.
- `pageX/`: Components specific to a given page (`Home`, `Dashboard`, etc.).

#### 📁 `pages/`

Page-level components that represent full views in the app. Each page may fetch data and render relevant components. Example: `Login.jsx`, `MovieList.jsx`, `BookingPage.jsx`.

#### 📁 `assets/`

Static files like images, icons, logos, or SVGs.

#### 📁 `api/`

Holds functions to interact with the backend. Encapsulates API logic and can define services like `getMovies()`, `bookSeat(id)` etc.

#### 📁 `utils/` _(planned)_

Helper functions, constants, formatting tools, and hooks (`useDebounce`, `formatDate`, etc.).

---

### 🖥 Backend – Express (Server)

#### 📁 `db/`

Database configuration and schema definitions using Drizzle ORM:

- `schema/`: Table definitions and relationships
- `index.ts`: Database connection and configuration

#### 📁 `routes/`

Defines API endpoints and maps them to the appropriate controller functions. Keeps the URL structure organized. Example:

```js
router.get("/movies", movieController.getAllMovies);
```

#### 📁 `controllers/`

Responsible for handling incoming HTTP requests. Calls service functions to execute business logic and sends back appropriate responses. Think of it as the "interface" between the web and your app logic.

#### 📁 `services/`

Contains core application logic (business rules). This layer abstracts operations like filtering data, validating input, or applying transformations. It's what your controller "delegates" to.

#### 📁 `middleware/`

Reusable Express middleware for things like:
s
- Request logging
- Error handling
- Authentication/authorization
- Input validation

#### 📁 `data/`

Contains data-related utilities and types:

- Type definitions
- Data transformation functions
- Constants and enums

#### 📄 `app.ts`

Sets up the Express app: loads middleware, connects to the database, sets up CORS, and mounts routes.

#### 📄 `server.ts`

Entry point that starts the server (e.g., `app.listen()`).

---

## 🧱 Summary

| Layer / Folder | Purpose                                         |
| -------------- | ----------------------------------------------- |
| `components/`  | Reusable building blocks for UI                 |
| `pages/`       | Views/screens rendered by routes                |
| `db/`          | Database configuration and schema definitions   |
| `routes/`      | Maps API endpoints to controller functions      |
| `controllers/` | Handle HTTP logic and coordinate between layers |
| `services/`    | Business logic and rules                        |
| `data/`        | Data types, transformations, and utilities      |
| `middleware/`  | Request preprocessing (auth, validation, etc.)  |
| `layouts/`     | Page layout wrappers for UI consistency         |
| `api/`         | Functions to talk to backend from frontend      |

---

## 🔄 Data Flow Overview

```
+---------------------+
|  🖱️ User Interaction|
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
|  🛣️ Express Route   |
+----------+----------+
           |
           v
+----------+----------+
| 🧭 Controller Logic |
+----------+----------+
           |
           v
+----------+----------+
| 🧠 Service Layer    |
+----------+----------+
           |
           v
+----------+----------+
| 🌊 Drizzle ORM      |
+----------+----------+
           |
           v
+----------+----------+
| 🗄️ PostgreSQL DB    |
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
- Type safety with Drizzle ORM
- Ease of testing and debugging

---

> 📌 Note: As the project evolves, this document will be updated to reflect more specific architectural decisions.
