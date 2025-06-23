```

.
├── doc                                 →  Project documentation
└── src
    ├── client
    │   ├── firebase
    │   ├── public
    │   └── src
    │       ├── api                     →  API abstraction layer (frontend)
    │       ├── assets
    │       │   └── Poster
    │       ├── components              →  All UI components (grouped by role/page)
    │       │   ├── cashier
    │       │   ├── common
    │       │   ├── customer
    │       │   │   ├── homecomponents
    │       │   │   ├── movie
    │       │   │   ├── payment
    │       │   │   ├── seats
    │       │   │   ├── theatres
    │       │   │   └── useraccess
    │       │   └── manager
    │       ├── pages                 →  Route-level components (views/screens)
    │       │   ├── cashier
    │       │   ├── customer
    │       │   └── manager
    │       ├── routes
    │       └── utils
    ├── server
    │   └── src
    │       ├── app                   →  Role-based modules (customer, cashier, manager)
    │       │   ├── cashier
    │       │   │   ├── controllers
    │       │   │   └── routes
    │       │   ├── customer
    │       │   │   ├── controllers
    │       │   │   └── routes
    │       │   └── manager
    │       │       ├── controllers
    │       │       └── routes
    │       ├── data
    │       ├── db                    →  Database models/config (Sequelize)
    │       │   └── models
    │       ├── firebase
    │       └── middleware            →  Express middleware (auth, error handling, etc.)
    └── shared
        └── types                     →  Shared types/interfaces (cross-app)

```
