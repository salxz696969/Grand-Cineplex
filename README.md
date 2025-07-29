# 🎬 Cinema Management System

> **A comprehensive full-stack web application for cinema operations, featuring multi-role interfaces for customers, cashiers, and managers.**

---

## 📋 Project Overview

This Cinema Management System is a full-stack web application built as part of the Backend Development course (Year 2, Term 3). The system provides three distinct user interfaces catering to different stakeholders in a cinema environment:

- **Customer Interface**: Online booking and seat selection
- **Cashier Interface**: In-person transactions and walk-in bookings
- **Manager Interface**: Administrative oversight and system management

The application handles movie management, screening schedules, real-time seat reservations, payment processing, and comprehensive reporting capabilities.

---

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons

### Backend

- **Node.js** with Express.js
- **PostgreSQL** database
- **Sequelize ORM** for database operations
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Development Tools

- **TypeScript** for type safety
- **ESLint** for code quality
- **Git** for version control
- **PostgreSQL** for database

---

## 🏗️ System Architecture

### Frontend Structure

```
src/client/src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, Modal, etc.)
│   ├── customer/       # Customer-specific components
│   ├── cashier/        # Cashier-specific components
│   └── manager/        # Manager-specific components
├── pages/              # Route-level components
├── api/                # API abstraction layer
├── assets/             # Static files
└── utils/              # Helper functions
```

### Backend Structure

```
src/server/src/
├── app/                # Role-based modules
│   ├── customer/       # Customer-facing routes & controllers
│   ├── cashier/        # Cashier-facing routes & controllers
│   └── manager/        # Manager-facing routes & controllers
├── db/                 # Database configuration
│   └── models/         # Sequelize model definitions
├── middleware/         # Express middleware
├── data/              # Database scripts
└── shared/            # Shared utilities
```

---

## 🗄️ Database Schema

### Core Entities

- **Movies**: Movie catalog with details (title, description, duration, genre, rating)
- **Theaters**: Cinema screens with seating configurations
- **Seats**: Individual seats with types (Regular, Premium, VIP)
- **Screenings**: Movie showtimes with pricing
- **Customers**: User accounts for online bookings
- **Staff**: Employee accounts for cashier and manager roles
- **Bookings**: Reservation records
- **Tickets**: Individual ticket information
- **Payments**: Transaction records

### Key Features

- Custom ENUM types for status management
- Foreign key constraints for data integrity
- Automatic timestamp management
- Role-based access control

---

## 👥 Team Members & Responsibilities

### **Ory Chanraksa** — Project Manager & Manager Interface

- **Role**: Full Stack Developer
- **Responsibilities**:
  - Manager interface development
  - Database design and optimization
  - System integration
  - Project coordination

### **Man Arafat** — Customer Interface

- **Role**: Full Stack Developer
- **Responsibilities**:
  - Customer interface development
  - User experience design
  - Responsive web design
  - Frontend testing

### **Sao Visal** — Cashier Interface

- **Role**: Full Stack Developer
- **Responsibilities**:
  - Cashier interface development
  - API development and integration
  - Payment processing implementation
  - Backend testing

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cinema-management-system
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd src/client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # In src/server directory
   cp .env.example .env
   ```

   Configure the following variables in `.env`:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/cinema_db
   JWT_SECRET=your_jwt_secret_here
   PORT=3000
   ```

4. **Set up the database**

   ```bash
   # Create database
   createdb cinema_db

   # Run database migrations
   cd src/server
   npm run db:migrate

   # Seed initial data (optional)
   npm run db:seed
   ```

5. **Start the development servers**

   ```bash
   # Start backend server
   cd src/server
   npm run dev

   # Start frontend server (in new terminal)
   cd src/client
   npm run dev
   ```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

---

## 📚 API Documentation

### Base URLs

- **Customer API**: `/customer`
- **Cashier API**: `/cashier`
- **Manager API**: `/manager`

### Authentication

All protected routes require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Movies

- `GET /customer/movies/` - Get all movies (public)
- `GET /customer/movies/now-showing` - Get movies showing in 7 days
- `POST /manager/movies/` - Add new movie (manager only)

#### Bookings

- `POST /customer/bookings/` - Create booking (customer)
- `GET /manager/bookings/` - Get all bookings (manager)
- `POST /cashier/bookings/booking` - Create walk-in booking (cashier)

#### Payments

- `POST /customer/payment/qr-code` - Create KHQR payment
- `GET /customer/payment/status/:tranId` - Check payment status

For complete API documentation, see the individual route files in `src/server/src/app/`.

---

## 🔐 User Roles & Permissions

### Customer

- Browse movies and showtimes
- Select seats and make bookings
- Process payments online
- View booking history
- Manage account profile

### Cashier

- Create walk-in bookings
- Process in-person payments
- Manage customer information
- View daily transactions
- Handle refunds

### Manager

- Manage movie catalog
- Configure theaters and screenings
- Monitor booking statistics
- Manage staff accounts
- Generate financial reports
- System configuration

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd src/server
npm test

# Frontend tests
cd src/client
npm test
```

### Test Coverage

- Unit tests for controllers and models
- Integration tests for API endpoints
- Frontend component testing

---

## 📊 Features

### Customer Features

- ✅ User registration and authentication
- ✅ Browse movies with details and ratings
- ✅ View screening schedules
- ✅ Interactive seat selection
- ✅ Multiple seat types (Regular, Premium, VIP)
- ✅ Secure payment processing
- ✅ Booking confirmation and ticket generation
- ✅ Booking history and management
- ✅ Account profile management

### Cashier Features

- ✅ Staff authentication and role-based access
- ✅ Walk-in customer booking creation
- ✅ Real-time seat availability checking
- ✅ Manual seat selection for customers
- ✅ Payment collection and processing
- ✅ Ticket printing and distribution
- ✅ Booking modification and cancellation
- ✅ Refund processing
- ✅ Daily transaction reports

### Manager Features

- ✅ Comprehensive movie management
- ✅ Theater and screening schedule management
- ✅ Staff account management
- ✅ Financial reporting and analytics
- ✅ Booking statistics and occupancy reports
- ✅ Customer database management
- ✅ System configuration and settings

---

## 🔧 Development

### Code Style

- **Frontend**: ESLint + Prettier configuration
- **Backend**: ESLint with TypeScript rules
- **Database**: Sequelize conventions

### Git Workflow

- Feature branches for development
- Pull request reviews
- Conventional commit messages

### Database Migrations

```bash
# Create new migration
npm run db:migrate:create

# Run migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```

---

## 📁 Project Structure

```
cinema-management-system/
├── src/
│   ├── client/                 # Frontend React application
│   │   ├── src/
│   │   │   ├── components/     # UI components by role
│   │   │   ├── pages/         # Route components
│   │   │   ├── api/           # API service calls
│   │   │   ├── utils/         # Utility functions
│   │   │   └── assets/        # Static files
│   │   └── public/            # Public assets
│   └── server/                # Backend Node.js application
│       ├── src/
│       │   ├── app/           # Role-based modules
│       │   ├── db/            # Database models
│       │   ├── middleware/    # Express middleware
│       │   ├── data/          # Database scripts
│       │   └── shared/        # Shared utilities
│       └── config/            # Configuration files
├── doc/                       # Project documentation
├── tests/                     # Test files
└── README.md                  # This file
```

---

## 🚧 Development Status

### Completed Features

- ✅ Database schema and models
- ✅ Authentication system
- ✅ Basic CRUD operations
- ✅ Role-based access control
- ✅ Movie management system
- ✅ Booking and reservation logic
- ✅ Payment processing integration

### In Progress

- 🔄 User interface refinements
- 🔄 Advanced reporting features
- 🔄 Performance optimizations
- 🔄 Comprehensive testing

### Planned Features

- 📋 Real-time seat availability updates
- 📋 Advanced analytics dashboard
- 📋 Mobile-responsive design improvements
- 📋 Multi-language support
- 📋 Email notification system

---

## 🤝 Contributing

This is an academic project, but contributions and suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is developed as part of the Backend Development course at CADT (Cambodia Academy of Digital Technology).

---

## 📞 Contact

**Project Team:**

- **Ory Chanraksa** - Manager Interface & Project Coordination
- **Man Arafat** - Customer Interface & UX Design
- **Sao Visal** - Cashier Interface & Backend Development

**Course:** Backend Development  
**Institution:** Cambodia Academy of Digital Technology  
**Academic Year:** 2024-2025

---

## 🙏 Acknowledgments

- **Mr. Kheang Kim Ang** lecturer
- **PostgreSQL** community for excellent documentation
- **React** and **Express.js** communities for robust frameworks
- **Sequelize** team for the powerful ORM

---

_This project demonstrates modern full-stack development practices with a focus on scalability, maintainability, and user experience._
