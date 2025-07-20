-- Cinemas table
ALTER TABLE cinemas RENAME COLUMN isactive TO "isActive";
ALTER TABLE cinemas RENAME COLUMN createdat TO "createdAt";
ALTER TABLE cinemas RENAME COLUMN updatedat TO "updatedAt";

-- Movies table
ALTER TABLE movies RENAME COLUMN posterurl TO "posterUrl";
ALTER TABLE movies RENAME COLUMN trailerurl TO "trailerUrl";
ALTER TABLE movies RENAME COLUMN releasedate TO "releaseDate";
ALTER TABLE movies RENAME COLUMN createdat TO "createdAt";
ALTER TABLE movies RENAME COLUMN updatedat TO "updatedAt";

-- Theaters table
ALTER TABLE theaters RENAME COLUMN cinemaid TO "cinemaId";
ALTER TABLE theaters RENAME COLUMN createdat TO "createdAt";
ALTER TABLE theaters RENAME COLUMN updatedat TO "updatedAt";

-- Seats table
ALTER TABLE seats RENAME COLUMN theaterid TO "theaterId";
ALTER TABLE seats RENAME COLUMN rownumber TO "rowNumber";
ALTER TABLE seats RENAME COLUMN seatnumber TO "seatNumber";
ALTER TABLE seats RENAME COLUMN seattype TO "seatType";
ALTER TABLE seats RENAME COLUMN createdat TO "createdAt";
ALTER TABLE seats RENAME COLUMN updatedat TO "updatedAt";

-- Screenings table
ALTER TABLE screenings RENAME COLUMN movieid TO "movieId";
ALTER TABLE screenings RENAME COLUMN theaterid TO "theaterId";
ALTER TABLE screenings RENAME COLUMN screeningdate TO "screeningDate";
ALTER TABLE screenings RENAME COLUMN screeningtime TO "screeningTime";
ALTER TABLE screenings RENAME COLUMN createdat TO "createdAt";
ALTER TABLE screenings RENAME COLUMN updatedat TO "updatedAt";

-- Customers table
ALTER TABLE customers RENAME COLUMN dateofbirth TO "dateOfBirth";
ALTER TABLE customers RENAME COLUMN createdat TO "createdAt";
ALTER TABLE customers RENAME COLUMN updatedat TO "updatedAt";

-- Staff table
ALTER TABLE staff RENAME COLUMN hireddate TO "hiredDate";
ALTER TABLE staff RENAME COLUMN isactive TO "isActive";
ALTER TABLE staff RENAME COLUMN createdat TO "createdAt";
ALTER TABLE staff RENAME COLUMN updatedat TO "updatedAt";

-- Bookings table
ALTER TABLE bookings RENAME COLUMN customerid TO "customerId";
ALTER TABLE bookings RENAME COLUMN screeningid TO "screeningId";
ALTER TABLE bookings RENAME COLUMN createdbystaffid TO "createdByStaffId";
ALTER TABLE bookings RENAME COLUMN createdat TO "createdAt";
ALTER TABLE bookings RENAME COLUMN updatedat TO "updatedAt";

-- Tickets table
ALTER TABLE tickets RENAME COLUMN bookingid TO "bookingId";
ALTER TABLE tickets RENAME COLUMN seatid TO "seatId";
ALTER TABLE tickets RENAME COLUMN createdat TO "createdAt";

-- Payments table
ALTER TABLE payments RENAME COLUMN bookingid TO "bookingId";
ALTER TABLE payments RENAME COLUMN createdat TO "createdAt";
ALTER TABLE payments RENAME COLUMN updatedat TO "updatedAt";
