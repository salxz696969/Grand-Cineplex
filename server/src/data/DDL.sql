
-- IMPROVED CINEMA MANAGEMENT SYSTEM DDL
-- ========================================

create database movie_testing;

-- Custom ENUM types
CREATE TYPE payment_type AS ENUM ('cash', 'card', 'digital_wallet', 'bank_transfer');
CREATE TYPE booking_status AS ENUM ('pending', 'reserved', 'confirmed', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE staff_role AS ENUM ('cashier', 'admin', 'manager');
CREATE TYPE seat_type AS ENUM ('regular', 'premium', 'vip');

-- ========================================
-- CORE TABLES
-- ========================================

CREATE TABLE cinemas
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    address    TEXT,
    city       VARCHAR(100),
    state      VARCHAR(100),
    country    VARCHAR(100),
    phone      VARCHAR(20),
    email      VARCHAR(100),
    is_active  BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies table
CREATE TABLE movies
(
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    description  TEXT,
    duration     INTEGER      NOT NULL, -- in minutes (fixed from TIME type)
    genre        VARCHAR(100),
    rating       VARCHAR(10),
    poster_url   TEXT,                  -- renamed from poster for clarity
    release_date DATE,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Theaters/Screens table
CREATE TABLE theaters
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    cinema_id  INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

-- Seats table (removed is_booked - seats are reusable per show)
CREATE TABLE seats
(
    id          SERIAL PRIMARY KEY,
    theater_id  INTEGER    NOT NULL,
    row_number  VARCHAR(5) NOT NULL,
    seat_number INTEGER    NOT NULL,
    seat_type   seat_type DEFAULT 'regular',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (theater_id) REFERENCES theaters (id),
    UNIQUE (theater_id, row_number, seat_number)
);

-- Screenings table
CREATE TABLE screenings
(
    id             SERIAL PRIMARY KEY,
    movie_id       INTEGER       NOT NULL,
    theater_id     INTEGER       NOT NULL,
    screening_date DATE          NOT NULL,
    screening_time TIME          NOT NULL,
    price          DECIMAL(8, 2) NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies (id),
    FOREIGN KEY (theater_id) REFERENCES theaters (id),
    UNIQUE (theater_id, screening_date, screening_time)
);

-- ========================================
-- USER MANAGEMENT
-- ========================================

-- Customers table
CREATE TABLE customers
(
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100)        NOT NULL,
    email         VARCHAR(100) UNIQUE NOT NULL,
    phone         VARCHAR(20),
    password      VARCHAR(255)        NOT NULL,
    date_of_birth DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff table for cashier or admin support
CREATE TABLE staff
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100)        NOT NULL,
    email      VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    role       staff_role          NOT NULL,
    phone      VARCHAR(20),
    hired_date DATE,
    is_active  BOOLEAN   DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- BOOKING SYSTEM (IMPROVED STRUCTURE)
-- ========================================

-- Bookings table (parent table - removed individual ticket fields)
CREATE TABLE bookings
(
    id                  SERIAL PRIMARY KEY,
    customer_id         INTEGER,
    screening_id        INTEGER NOT NULL,
    status              booking_status DEFAULT 'pending',
    created_by_staff_id INTEGER, -- for in-person sales but can also be used to know if it is booked by customer or cashier (walk-in) can be null
    created_at          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id),
    FOREIGN KEY (screening_id) REFERENCES screenings (id),
    FOREIGN KEY (created_by_staff_id) REFERENCES staff (id)
);

-- Tickets table (child table - multiple tickets per booking)
CREATE TABLE tickets
(
    id         SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    seat_id    INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats (id),
    UNIQUE (booking_id, seat_id)
);

-- ========================================
-- PAYMENT SYSTEM
-- ========================================

-- Payments table (linked to bookings)
CREATE TABLE payments
(
    id         SERIAL PRIMARY KEY,
    booking_id INTEGER        NOT NULL,
    amount     DECIMAL(10, 2) NOT NULL,
    method     payment_type   NOT NULL,
    status     payment_status DEFAULT 'pending',
    created_at TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Customers
CREATE INDEX idx_customers_email ON customers (email);
CREATE INDEX idx_customers_phone ON customers (phone);

-- Screenings
CREATE INDEX idx_screenings_movie_date ON screenings (movie_id, screening_date);
CREATE INDEX idx_screenings_theater_date ON screenings (theater_id, screening_date);

-- Bookings
CREATE INDEX idx_bookings_customer ON bookings (customer_id);
CREATE INDEX idx_bookings_screening ON bookings (screening_id);
CREATE INDEX idx_bookings_date ON bookings (created_at);

-- Tickets
CREATE INDEX idx_tickets_booking ON tickets (booking_id);
CREATE INDEX idx_tickets_seat ON tickets (seat_id);

-- Payments
CREATE INDEX idx_payments_booking ON payments (booking_id);
CREATE INDEX idx_payments_status ON payments (status);

-- Theaters
CREATE INDEX idx_theaters_cinema ON theaters(cinema_id);
CREATE INDEX idx_cinemas_location ON cinemas(city, state, country);

-- ========================================
-- CONSTRAINTS AND TRIGGERS
-- ========================================

CREATE FUNCTION create_created_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.created_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;

-- Function to update timestamps
CREATE
    OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at
        = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
    LANGUAGE plpgsql;

-- Triggers for created_at columns
CREATE TRIGGER trigger_create_movies_created_at
    BEFORE INSERT
    ON movies
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_theaters_created_at
    BEFORE INSERT
    ON theaters
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_screenings_created_at
    BEFORE INSERT
    ON screenings
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_customers_created_at
    BEFORE INSERT
    ON customers
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_staff_created_at
    BEFORE INSERT
    ON staff
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_bookings_created_at
    BEFORE INSERT
    ON bookings
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_tickets_created_at
    BEFORE INSERT
    ON tickets
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

CREATE TRIGGER trigger_create_payments_created_at
    BEFORE INSERT
    ON payments
    FOR EACH ROW
EXECUTE FUNCTION create_created_at_column();

-- Triggers for updated_at columns
CREATE TRIGGER trigger_update_movies_updated_at
    BEFORE UPDATE
    ON movies
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_theaters_updated_at
    BEFORE UPDATE
    ON theaters
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_screenings_updated_at
    BEFORE UPDATE
    ON screenings
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_customers_updated_at
    BEFORE UPDATE
    ON customers
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_staff_updated_at
    BEFORE UPDATE
    ON staff
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_bookings_updated_at
    BEFORE UPDATE
    ON bookings
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_tickets_updated_at
    BEFORE UPDATE
    ON tickets
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_payments_updated_at
    BEFORE UPDATE
    ON payments
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();



-- ========================================
-- DROP TABLES (DANGEROUS)
-- ========================================
-- SET session_replication_role = 'replica';

-- DROP TABLE IF EXISTS cinema CASCADE;
-- DROP TABLE IF EXISTS payments CASCADE;
-- DROP TABLE IF EXISTS tickets CASCADE;
-- DROP TABLE IF EXISTS bookings CASCADE;
-- DROP TABLE IF EXISTS screenings CASCADE;
-- DROP TABLE IF EXISTS seats CASCADE;
-- DROP TABLE IF EXISTS staff CASCADE;
-- DROP TABLE IF EXISTS customers CASCADE;
-- DROP TABLE IF EXISTS theaters CASCADE;
-- DROP TABLE IF EXISTS movies CASCADE;

-- SET session_replication_role = 'origin';

-- ========================================
-- SAMPLE DATA INSERTS
-- ========================================

-- Cinemas
INSERT INTO cinemas (name, address, city, state, country, phone, email)
VALUES
    ('Minor Cineplex Central', '123 Main St', 'Bangkok', 'Bangkok', 'Thailand', '021234567', 'central@minor.com'),
    ('Minor Cineplex North', '456 North Ave', 'Chiang Mai', 'Chiang Mai', 'Thailand', '053123456', 'north@minor.com'),
    ('Minor Cineplex South', '789 South Rd', 'Phuket', 'Phuket', 'Thailand', '076123456', 'south@minor.com'),
    ('Minor Cineplex East', '101 East Blvd', 'Pattaya', 'Chonburi', 'Thailand', '038123456', 'east@minor.com'),
    ('Minor Cineplex West', '202 West St', 'Hat Yai', 'Songkhla', 'Thailand', '074123456', 'west@minor.com');

-- Movies
INSERT INTO movies (title, description, duration, genre, rating, poster_url, release_date)
VALUES
    ('The Great Adventure', 'An epic journey of discovery.', 120, 'Adventure', 'PG-13', 'https://example.com/poster1.jpg', '2024-06-01'),
    ('Romance in the Rain', 'A love story set in the rainy season.', 105, 'Romance', 'PG', 'https://example.com/poster2.jpg', '2024-05-15'),
    ('Space Odyssey', 'A sci-fi exploration beyond the stars.', 140, 'Sci-Fi', 'PG-13', 'https://example.com/poster3.jpg', '2024-07-10'),
    ('Comedy Night', 'A hilarious night of laughter.', 95, 'Comedy', 'PG', 'https://example.com/poster4.jpg', '2024-04-20'),
    ('Horror House', 'A terrifying haunted house experience.', 110, 'Horror', 'R', 'https://example.com/poster5.jpg', '2024-10-31'),
    ('Mystery Island', 'A group of friends uncover secrets.', 130, 'Mystery', 'PG-13', 'https://example.com/poster6.jpg', '2024-08-15'),
    ('Animated Dreams', 'A magical animated adventure.', 100, 'Animation', 'G', 'https://example.com/poster7.jpg', '2024-03-10'),
    ('Action Heroes', 'Heroes save the world.', 125, 'Action', 'PG-13', 'https://example.com/poster8.jpg', '2024-09-05'),
    ('Documentary Life', 'A look at real life stories.', 90, 'Documentary', 'PG', 'https://example.com/poster9.jpg', '2024-02-01'),
    ('Fantasy Realm', 'A fantasy world of dragons.', 150, 'Fantasy', 'PG-13', 'https://example.com/poster10.jpg', '2024-12-20');

-- Theaters
INSERT INTO theaters (name, cinema_id)
VALUES
    ('Screen 1', 1), ('Screen 2', 1), ('Screen 3', 1),
    ('Screen A', 2), ('Screen B', 2),
    ('Screen X', 3), ('Screen Y', 3),
    ('Screen E', 4), ('Screen F', 4),
    ('Screen W', 5);

-- Seats (add 10 seats per theater, 5 rows, 2 seats per row, mix types)
INSERT INTO seats (theater_id, row_number, seat_number, seat_type) VALUES
    -- Theater 1
    (1, 'A', 1, 'regular'), (1, 'A', 2, 'regular'),
    (1, 'B', 1, 'premium'), (1, 'B', 2, 'regular'),
    (1, 'C', 1, 'vip'), (1, 'C', 2, 'premium'),
    (1, 'D', 1, 'regular'), (1, 'D', 2, 'regular'),
    (1, 'E', 1, 'regular'), (1, 'E', 2, 'premium'),
    -- Theater 2
    (2, 'A', 1, 'vip'), (2, 'A', 2, 'premium'),
    (2, 'B', 1, 'regular'), (2, 'B', 2, 'regular'),
    (2, 'C', 1, 'regular'), (2, 'C', 2, 'premium'),
    (2, 'D', 1, 'regular'), (2, 'D', 2, 'regular'),
    (2, 'E', 1, 'regular'), (2, 'E', 2, 'vip'),
    -- Theater 3
    (3, 'A', 1, 'regular'), (3, 'A', 2, 'regular'),
    (3, 'B', 1, 'premium'), (3, 'B', 2, 'regular'),
    (3, 'C', 1, 'vip'), (3, 'C', 2, 'premium'),
    (3, 'D', 1, 'regular'), (3, 'D', 2, 'regular'),
    (3, 'E', 1, 'regular'), (3, 'E', 2, 'premium'),
    -- Theater 4
    (4, 'A', 1, 'regular'), (4, 'A', 2, 'regular'),
    (4, 'B', 1, 'premium'), (4, 'B', 2, 'regular'),
    (4, 'C', 1, 'vip'), (4, 'C', 2, 'premium'),
    (4, 'D', 1, 'regular'), (4, 'D', 2, 'regular'),
    (4, 'E', 1, 'regular'), (4, 'E', 2, 'premium'),
    -- Theater 5
    (5, 'A', 1, 'vip'), (5, 'A', 2, 'premium'),
    (5, 'B', 1, 'regular'), (5, 'B', 2, 'regular'),
    (5, 'C', 1, 'regular'), (5, 'C', 2, 'premium'),
    (5, 'D', 1, 'regular'), (5, 'D', 2, 'regular'),
    (5, 'E', 1, 'regular'), (5, 'E', 2, 'vip');

-- Screenings (add 20 screenings, mix dates, times, movies, theaters)
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price) VALUES
    (1, 1, '2024-06-10', '18:00', 250.00),
    (2, 1, '2024-06-10', '20:30', 200.00),
    (3, 2, '2024-06-11', '19:00', 300.00),
    (4, 3, '2024-06-12', '17:00', 220.00),
    (5, 4, '2024-06-13', '21:00', 180.00),
    (6, 5, '2024-06-14', '16:00', 210.00),
    (7, 6, '2024-06-15', '15:00', 190.00),
    (8, 7, '2024-06-16', '18:30', 260.00),
    (9, 8, '2024-06-17', '20:00', 230.00),
    (10, 9, '2024-06-18', '19:30', 240.00),
    (1, 10, '2024-06-19', '17:00', 200.00),
    (2, 1, '2024-06-20', '18:00', 250.00),
    (3, 2, '2024-06-21', '20:30', 200.00),
    (4, 3, '2024-06-22', '19:00', 300.00),
    (5, 4, '2024-06-23', '17:00', 220.00),
    (6, 5, '2024-06-24', '21:00', 180.00),
    (7, 6, '2024-06-25', '16:00', 210.00),
    (8, 7, '2024-06-26', '15:00', 190.00),
    (9, 8, '2024-06-27', '18:30', 260.00),
    (10, 9, '2024-06-28', '20:00', 230.00);

-- Customers (add 10 customers)
INSERT INTO customers (name, email, phone, password, date_of_birth) VALUES
    ('Alice Smith', 'alice@example.com', '0812345678', 'hashedpassword1', '1990-01-01'),
    ('Bob Lee', 'bob@example.com', '0823456789', 'hashedpassword2', '1985-05-12'),
    ('Charlie Brown', 'charlie@example.com', '0834567890', 'hashedpassword3', '1992-03-15'),
    ('Diana Prince', 'diana@example.com', '0845678901', 'hashedpassword4', '1988-07-22'),
    ('Ethan Hunt', 'ethan@example.com', '0856789012', 'hashedpassword5', '1983-11-30'),
    ('Fiona Gallagher', 'fiona@example.com', '0867890123', 'hashedpassword6', '1995-09-18'),
    ('George Miller', 'george@example.com', '0878901234', 'hashedpassword7', '1991-05-05'),
    ('Hannah Lee', 'hannah@example.com', '0889012345', 'hashedpassword8', '1993-12-12'),
    ('Ivan Petrov', 'ivan@example.com', '0890123456', 'hashedpassword9', '1987-04-25'),
    ('Julia Roberts', 'julia@example.com', '0801234567', 'hashedpassword10', '1996-08-08');

-- Staff (add 5 staff)
INSERT INTO staff (name, email, password, role, phone, hired_date) VALUES
    ('Sam Cashier', 'sam.cashier@minor.com', 'staffpass1', 'cashier', '0912345678', '2022-01-10'),
    ('Anna Admin', 'anna.admin@minor.com', 'staffpass2', 'admin', '0923456789', '2021-03-15'),
    ('Mike Manager', 'mike.manager@minor.com', 'staffpass3', 'manager', '0934567890', '2020-07-20'),
    ('Lisa Cashier', 'lisa.cashier@minor.com', 'staffpass4', 'cashier', '0945678901', '2023-02-05'),
    ('Tom Admin', 'tom.admin@minor.com', 'staffpass5', 'admin', '0956789012', '2022-11-11');

-- Bookings (add 20 bookings, some by customers, some by staff)
INSERT INTO bookings (customer_id, screening_id, status, created_by_staff_id) VALUES
    (1, 1, 'confirmed', NULL),
    (2, 2, 'confirmed', NULL),
    (3, 3, 'pending', 1),
    (4, 4, 'reserved', NULL),
    (5, 5, 'confirmed', 2),
    (6, 6, 'cancelled', NULL),
    (7, 7, 'confirmed', NULL),
    (8, 8, 'pending', 3),
    (9, 9, 'confirmed', NULL),
    (10, 10, 'reserved', 4),
    (1, 11, 'confirmed', NULL),
    (2, 12, 'confirmed', NULL),
    (3, 13, 'pending', 1),
    (4, 14, 'reserved', NULL),
    (5, 15, 'confirmed', 2),
    (6, 16, 'cancelled', NULL),
    (7, 17, 'confirmed', NULL),
    (8, 18, 'pending', 3),
    (9, 19, 'confirmed', NULL),
    (10, 20, 'reserved', 4);

-- Tickets (add 40 tickets, 2 per booking, random seats)
INSERT INTO tickets (booking_id, seat_id) VALUES
    (1, 1), (1, 2),
    (2, 3), (2, 4),
    (3, 5), (3, 6),
    (4, 7), (4, 8),
    (5, 9), (5, 10),
    (6, 11), (6, 12),
    (7, 13), (7, 14),
    (8, 15), (8, 16),
    (9, 17), (9, 18),
    (10, 19), (10, 20),
    (11, 21), (11, 22),
    (12, 23), (12, 24),
    (13, 25), (13, 26),
    (14, 27), (14, 28),
    (15, 29), (15, 30),
    (16, 31), (16, 32),
    (17, 33), (17, 34),
    (18, 35), (18, 36),
    (19, 37), (19, 38),
    (20, 39), (20, 40);

-- Payments (add 20 payments, one per booking)
INSERT INTO payments (booking_id, amount, method, status) VALUES
    (1, 500.00, 'card', 'completed'),
    (2, 400.00, 'cash', 'completed'),
    (3, 600.00, 'digital_wallet', 'pending'),
    (4, 440.00, 'card', 'completed'),
    (5, 360.00, 'bank_transfer', 'completed'),
    (6, 420.00, 'cash', 'refunded'),
    (7, 380.00, 'card', 'completed'),
    (8, 520.00, 'digital_wallet', 'pending'),
    (9, 460.00, 'card', 'completed'),
    (10, 400.00, 'cash', 'completed'),
    (11, 500.00, 'card', 'completed'),
    (12, 400.00, 'cash', 'completed'),
    (13, 600.00, 'digital_wallet', 'pending'),
    (14, 440.00, 'card', 'completed'),
    (15, 360.00, 'bank_transfer', 'completed'),
    (16, 420.00, 'cash', 'refunded'),
    (17, 380.00, 'card', 'completed'),
    (18, 520.00, 'digital_wallet', 'pending'),
    (19, 460.00, 'card', 'completed'),
    (20, 400.00, 'cash', 'completed');



    UPDATE screenings SET screening_date = '2025-06-17' WHERE id IN (1,2,3,4,5,6,7);