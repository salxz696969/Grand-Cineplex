create database grand_cineplex_db;

create type payment_type as enum ('cash', 'card', 'digital_wallet', 'bank_transfer');

alter type payment_type owner to neondb_owner;

create type booking_status as enum ('pending', 'reserved', 'confirmed', 'cancelled', 'refunded');

alter type booking_status owner to neondb_owner;

create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');

alter type payment_status owner to neondb_owner;

create type staff_role as enum ('cashier', 'admin', 'manager');

alter type staff_role owner to neondb_owner;

create type seat_type as enum ('regular', 'premium', 'vip');

alter type seat_type owner to neondb_owner;

create table cinemas
(
    id         serial
        primary key,
    name       varchar(255) not null,
    address    text,
    city       varchar(100),
    state      varchar(100),
    country    varchar(100),
    phone      varchar(20),
    email      varchar(100),
    is_active  boolean   default true,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table cinemas
    owner to neondb_owner;

create table movies
(
    id           serial
        primary key,
    title        varchar(200) not null,
    description  text,
    duration     integer      not null,
    genre        varchar(100),
    rating       double precision,
    poster_url   text,
    trailer_url  text,
    release_date date,
    created_at   timestamp default CURRENT_TIMESTAMP,
    updated_at   timestamp default CURRENT_TIMESTAMP
);

alter table movies
    owner to neondb_owner;

create table theaters
(
    id         serial
        primary key,
    name       varchar(100) not null,
    cinema_id  integer      not null
        constraint fk_theaters_cinema
            references cinemas,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table theaters
    owner to neondb_owner;

create table seats
(
    id          serial
        primary key,
    theater_id  integer    not null
        constraint fk_seats_theater
            references theaters,
    row_number  varchar(5) not null,
    seat_number integer    not null,
    seat_type   seat_type default 'regular'::seat_type,
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP,
    constraint uq_seats
        unique (theater_id, row_number, seat_number)
);

alter table seats
    owner to neondb_owner;

create table screenings
(
    id             serial
        primary key,
    movie_id       integer       not null
        constraint fk_screenings_movie
            references movies,
    theater_id     integer       not null
        constraint fk_screenings_theater
            references theaters,
    screening_date date          not null,
    screening_time time          not null,
    regular_seat_price          numeric(8, 2) not null,
    premium_seat_price          numeric(8, 2) not null,
    vip_seat_price          numeric(8, 2) not null,
    created_at     timestamp default CURRENT_TIMESTAMP,
    updated_at     timestamp default CURRENT_TIMESTAMP,
    constraint uq_screenings
        unique (theater_id, screening_date, screening_time)
);

alter table screenings
    owner to neondb_owner;

create table customers
(
    id            serial
        primary key,
    name          varchar(100) not null,
    email         varchar(100) not null
        unique,
    phone         varchar(20),
    password      varchar(255) not null,
    date_of_birth date,
    created_at    timestamp default CURRENT_TIMESTAMP,
    updated_at    timestamp default CURRENT_TIMESTAMP
);

alter table customers
    owner to neondb_owner;

create table staff
(
    id         serial
        primary key,
    name       varchar(100) not null,
    email      varchar(100) not null
        unique,
    password   varchar(255) not null,
    role       staff_role   not null,
    phone      varchar(20),
    hired_date date,
    is_active  boolean   default true,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP
);

alter table staff
    owner to neondb_owner;

create table bookings
(
    id                  serial
        primary key,
    customer_id         integer
        constraint fk_bookings_customer
            references customers,
    screening_id        integer not null
        constraint fk_bookings_screening
            references screenings,
    status              booking_status default 'pending'::booking_status,
    created_by_staff_id integer
        constraint fk_bookings_staff
            references staff,
    created_at          timestamp      default CURRENT_TIMESTAMP,
    updated_at          timestamp      default CURRENT_TIMESTAMP
);

alter table bookings
    owner to neondb_owner;

create table tickets
(
    id         serial
        primary key,
    booking_id integer not null
        constraint fk_tickets_booking
            references bookings
            on delete cascade,
    seat_id    integer not null
        constraint fk_tickets_seat
            references seats,
    created_at timestamp default CURRENT_TIMESTAMP,
    constraint uq_tickets
        unique (booking_id, seat_id)
);

alter table tickets
    owner to neondb_owner;

create table payments
(
    id         serial
        primary key,
    booking_id integer        not null
        constraint fk_payments_booking
            references bookings,
    amount     numeric(10, 2) not null,
    method     payment_type   not null,
    status     payment_status default 'pending'::payment_status,
    created_at timestamp      default CURRENT_TIMESTAMP,
    updated_at timestamp      default CURRENT_TIMESTAMP
);

alter table payments
    owner to neondb_owner;

