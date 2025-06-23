# 🎬 Cinema Management System

A modern, full-stack cinema management system built with React, Express, PostgreSQL, and Drizzle ORM. This system provides interfaces for customers, cashiers, and managers to handle movie bookings, theater management, and administrative tasks.

## 🚀 Features

### Customer Interface

- **Movie Browsing**: Browse available movies with details
- **Showtime Selection**: View and select movie showtimes
- **Seat Booking**: Interactive seat selection
- **User Authentication**: Sign up, sign in, and account management
- **Booking Management**: View and manage existing bookings

### Cashier Interface

- **Walk-in Bookings**: Create bookings for customers without accounts
- **Payment Processing**: Handle cash, card, and digital payments
- **Seat Management**: Real-time seat availability
- **Booking Modifications**: Edit or cancel existing bookings
- **Quick Search**: Fast movie and customer lookup

### Manager Interface

- **Movie Management**: Add, edit, and remove movies
- **Screening Schedule**: Manage showtimes and theater assignments
- **Staff Management**: Handle employee accounts and roles
- **Sales Reports**: View booking statistics and revenue
- **System Settings**: Configure cinema settings

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Drizzle ORM** - Type-safe database queries
- **TypeScript** - Type safety

### Development Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
cinema-management-system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Shared components
│   │   │   ├── customer/   # Customer-specific components
│   │   │   ├── cashier/    # Cashier-specific components
│   │   │   └── manager/    # Manager-specific components
│   │   ├── pages/          # Page components
│   │   │   ├── customer/   # Customer pages
│   │   │   ├── cashier/    # Cashier pages
│   │   │   └── manager/    # Manager pages
│   │   ├── routes/         # Route definitions
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── db/            # Database configuration
│   │   │   ├── schema/    # Drizzle schema definitions
│   │   │   └── index.ts   # Database connection
│   │   ├── controllers/   # Request handlers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── data/          # Data utilities
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── doc/                   # Documentation
│   ├── ARCHITECTURE.md    # System architecture
│   ├── FOLDER_STRUCTURE.md # Project structure
│   ├── BEST_PRACTICE.md   # Coding guidelines
│   └── DRIZZLE_TUTORIAL.md # Database usage guide
└── README.md
```

## 🗄️ Database Schema

The system uses PostgreSQL with the following main tables:

- **movies** - Movie information and metadata
- **theaters** - Theater/screen details
- **screenings** - Movie showtimes
- **seats** - Seat configurations
- **customers** - Customer accounts
- **staff** - Employee accounts
- **bookings** - Booking records
- **tickets** - Individual tickets
- **payments** - Payment transactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cinema-management-system
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # In server directory, create .env file
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/cinema_db
   PORT=3001
   JWT_SECRET=your-secret-key
   ```

4. **Set up the database**

   ```bash
   # Run the DDL script
   psql -U username -d cinema_db -f server/src/data/DDL.sql
   ```

5. **Start the development servers**

   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server (in new terminal)
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📱 Usage

### Customer Interface

- Navigate to `/` for the main customer interface
- Browse movies and select showtimes
- Create an account or sign in to make bookings

### Cashier Interface

- Navigate to `/cashier` for the cashier interface
- Use the booking system to create walk-in reservations
- Process payments and manage seat assignments

### Manager Interface

- Navigate to `/manager` for the management interface
- Manage movies, screenings, and staff accounts
- View reports and system analytics

## 🔧 Development

### Code Style

- Follow the guidelines in `doc/BEST_PRACTICE.md`
- Use TypeScript for type safety
- Follow the established folder structure
- Use Drizzle ORM for database operations

### Database Operations

- See `doc/DRIZZLE_TUTORIAL.md` for database usage examples
- Use the schema files in `server/src/db/schema/`
- Follow the established naming conventions

### Adding New Features

1. Create components in the appropriate directory
2. Add routes in the corresponding route files
3. Implement backend API endpoints
4. Update database schema if needed
5. Add tests for new functionality

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## 📦 Building for Production

```bash
# Build frontend
cd client
npm run build

# Build backend
cd server
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Backend Development** - Database design, API development
- **Frontend Development** - UI/UX implementation
- **Full Stack** - System integration and deployment

## 📞 Support

For support and questions:

- Check the documentation in the `doc/` folder
- Review the architecture guide
- Contact the development team

---

**Built with ❤️ for modern cinema management**
