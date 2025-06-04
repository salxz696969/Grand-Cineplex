# 🧭 Best Practices Guide

A brief reference for maintaining consistency, readability, and scalability throughout the project.

---

## 📁 File & Folder Structure

* **Follow the given structure** (e.g., `components/`, `pages/`, `services/`, etc.).
* Group related files together by feature or function.
* **Keep components small and focused**. One component = one job.

---

## 🧩 Naming Conventions

### General

* Use **kebab-case** for folders: `movie-list`, `user-profile`
* Use **PascalCase** for React components: `MovieCard.jsx`, `UserForm.jsx`
* Use **camelCase** for variables and functions: `handleSubmit`, `fetchData`
* Use **UPPER\_SNAKE\_CASE** for constants: `MAX_RETRIES`, `API_URL`

### Backend

* **Models**: Singular + PascalCase (match DB table conceptually, e.g., `User.js`)
* **File naming style**: Prefer `user.controller.js`, `user.service.js`, `user.routes.js` for clarity.
  (`[entity].[layer].js`)
* **Middleware**: Name based on action, e.g., `authMiddleware.js`, `errorHandler.js`

---

## 📦 Module Imports

* Use **ES6 imports** (`import` / `export`) across frontend and backend.
  ✅ Yes: `import express from 'express'`
  🚫 No: `const express = require('express')`

* Avoid deep relative imports (like `../../../utils`). Use aliases or structure well.

---

## 💬 Commenting Guidelines

* Use comments sparingly but clearly:

  * `// TODO:` – For incomplete features or pending logic
  * `// FIXME:` – For known bugs or technical debt
  * `// NOTE:` – For clarifying why something is done a specific way
  * `// HACK:` – Temporary workaround

Example:

```js
// TODO: Replace with actual validation logic
// FIXME: This throws on empty input sometimes
```

---

## 🌐 API Layer (Frontend)

* Centralize API calls (e.g., in `api/[api].js`) to avoid scattered logic.
* Use meaningful names like `getUserData()` or `submitBooking()`.

---

## 🎨 Components

* Use `components/common/` for shared elements like `Button`, `Modal`, `Input`.
* Use subfolders in `components/` to group page-specific components.
* Keep presentational and logic code cleanly separated if possible.

---

## 🧪 Testing & Debugging

* Write minimal unit tests where critical (if applicable).
* Use clear console logs (remove before production).

```js
console.log('[User Fetch]', userData); // DEBUG:
```

---

## 🧪 Git & Version Control

## 📄 Other Notes

* Always keep `.env` for secrets — never commit `.env` or `node_modules`.
* Prefer `.jsx` for React files and `.js` for logic/backend.
* Write clean, predictable functions — avoid side effects.
