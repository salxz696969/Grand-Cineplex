```
.
├── client                          <-------- Front End (React + Vite)
│   ├── eslint.config.js            
│   ├── index.html                  <-------- Vite HTML entry point
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg                <-------- Public assets 
│   ├── src
│   │   ├── App.css                 <-------- Global styles, Tailwind import, CSS variables
│   │   ├── App.tsx                 <-------- Main React app layout
│   │   ├── assets                  <-------- Static assets (images, icons, etc.)
│   │   ├── components              <-------- Reusable and page-specific UI components
│   │   │   ├── common              <-------- Shared UI components (e.g. Button, Navbar, Skeleton, etc.)
│   │   │   ├── [page]              <-------- Components for page
│   │   │   └── [page]              <-------- Components for page
│   │   └── pages                   <-------- Route-level components (pages/views like Home, About)
│   │   ├── main.tsx                <-------- React + Vite entry point (renders <App />)
│   └── vite.config.ts             
├── doc                             <-------- Project structure documentation
└── server                          <-------- Back End (Express + PostgreSQL)
    ├── package-lock.json
    ├── package.json
    ├── server.ts                   <-------- Server entry point
    └── src
        ├── app.ts                  <-------- Express app setup and middleware loading
        ├── controllers             <-------- Handle HTTP request logic
        ├── middleware              <-------- Auth, error handling, logging, etc.
        ├── models                  <-------- Database models (PostgreSQL tables)
        ├── routes                  <-------- Define API endpoints and link to controllers
        └── services                <-------- Business logic (e.g. calculate seat availability)
```