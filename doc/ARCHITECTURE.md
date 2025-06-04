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
- **pg** 
- **Firebase, JWT or session-based auth (TBD)**

---


## 📐 Architectural Style

The app follows a **modular, layered architecture**, emphasizing separation of concerns and maintainability across both frontend and backend codebases.

---

### 🧩 Frontend – React (Client)

#### 📁 `components/`

This folder holds all reusable UI elements, categorized into:

* `common/`: Global shared components like `Button`, `Input`, `Modal`, etc.
* `pageX/`: Components specific to a given page (`Home`, `Dashboard`, etc.).


#### 📁 `pages/`

Page-level components that represent full views in the app. Each page may fetch data and render relevant components. Example: `Login.jsx`, `MovieList.jsx`, `BookingPage.jsx`.

#### 📁 `assets/`

Static files like images, icons, logos, or SVGs.

#### 📁 `api/` 

Holds functions to interact with the backend. Encapsulates API logic and can define services like `getMovies()`, `bookSeat(id)` etc.

#### 📁 `utils/` *(planned)*

Helper functions, constants, formatting tools, and hooks (`useDebounce`, `formatDate`, etc.).

---

### 🖥 Backend – Express (Server)

#### 📁 `routes/`

Defines API endpoints and maps them to the appropriate controller functions. Keeps the URL structure organized. Example:

```js
router.get("/movies", movieController.getAllMovies)
```

#### 📁 `controllers/`

Responsible for handling incoming HTTP requests. Calls service functions to execute business logic and sends back appropriate responses. Think of it as the "interface" between the web and your app logic.

#### 📁 `services/`

Contains core application logic (business rules). This layer abstracts operations like filtering data, validating input, or applying transformations. It’s what your controller “delegates” to.

#### 📁 `models/`

Represents your database tables/entities. If you're using an ORM like Sequelize or Prisma, this is where you define your schemas, relationships, and database access methods.

#### 📁 `middleware/`

Reusable Express middleware for things like:

* Request logging
* Error handling
* Authentication/authorization
* Input validation

#### 📄 `app.ts`

Sets up the Express app: loads middleware, connects to the database, sets up CORS, and mounts routes.

#### 📄 `server.ts`

Entry point that starts the server (e.g., `app.listen()`).

---


## 🧱 Summary

| Layer / Folder | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `components/`  | Reusable building blocks for UI                   |
| `pages/`       | Views/screens rendered by routes                  |
| `routes/`      | Maps API endpoints to controller functions        |
| `controllers/` | Handle HTTP logic and coordinate between layers   |
| `services/`    | Business logic and rules                          |
| `models/`      | Database schema and data interaction              |
| `middleware/`  | Request preprocessing (auth, validation, etc.)    |
| `layouts/`     | Page layout wrappers for UI consistency           |
| `api/`         | Functions to talk to backend from frontend        |

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
- Ease of testing and debugging

---



> 📌 Note: As the project evolves, this document will be updated to reflect more specific architectural decisions.


