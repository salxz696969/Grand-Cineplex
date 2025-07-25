// Enums / Union types
export type PaymentType = "cash" | "card" | "digital_wallet" | "bank_transfer";
export type BookingStatus =
  | "pending"
  | "reserved"
  | "confirmed"
  | "cancelled"
  | "refunded";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type SeatType = "regular" | "premium" | "vip";

// Core Entities

export interface Cinema {
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  id: number;
  title: string;
  description?: string;
  duration: number;
  genre?: string;
  rating?: number;
  posterUrl?: string;
  trailerUrl?: string;
  releaseDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Theater {
  id: number;
  name: string;
  cinemaId: number;
  createdAt: string;
  updatedAt: string;
}

// export interface Seat {
//   id: number;
//   theaterId?: number;
//   rowNumber: string;
//   seatNumber: number;
//   seatType: SeatType;
// }

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "vip";
  price: number;
  isBooked: boolean;
}

export interface Screening {
  id: number;
  movieId: number;
  theaterId: number;
  screeningDate: string; // YYYY-MM-DD
  screeningTime: string; // HH:mm:ss
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  customerId: number; // Now always required (no guests)
  screeningId: number;
  status: BookingStatus;
  createdByStaffId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: number;
  bookingId: number;
  seatId: number;
  createdAt: string;
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: PaymentType;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

// Extensions

export interface MovieWithScreenings extends Movie {
  screenings: Screening[];
}

export interface ApiSeat {
  id: number;
  rowNumber: string;
  seatNumber: number;
  seatType: SeatType;
  price: number;
  isBooked: boolean;
}

export interface BookingSummary {
  movieTitle: string;
  theaterName: string;
  date: string;
  time: string;
  seats: {
    seatNumber: string;
    price: number;
  }[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  screeningId?: number;
}

export interface ScreeningSeatData {
  movieTitle: string;
  theaterName: string;
  screeningDate: string;
  screeningTime: string;
  price: number;
  seats: ApiSeat[];
}

export interface ScreeningWithTheaterName extends Screening {
  theaterName: string;
}
