// Enums / Union types
export type PaymentType = "cash" | "card" | "digital_wallet" | "bank_transfer";
export type BookingStatus = "pending" | "reserved" | "confirmed" | "cancelled" | "refunded";
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Movie {
  id: number;
  title: string;
  description?: string;
  duration: number;
  genre?: string;
  rating?: number;
  poster_url?: string;
  trailer_url?: string;
  release_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Theater {
  id: number;
  name: string;
  cinema_id: number;
  created_at: string;
  updated_at: string;
}

// export interface Seat {
//   id: number;
//   theater_id?: number;
//   row_number: string;
//   seat_number: number;
//   seat_type: SeatType;
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
  movie_id: number;
  theater_id: number;
  screening_date: string; // YYYY-MM-DD
  screening_time: string; // HH:mm:ss
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  customer_id: number; // Now always required (no guests)
  screening_id: number;
  status: BookingStatus;
  created_by_staff_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  booking_id: number;
  seat_id: number;
  created_at: string;
}

export interface Payment {
  id: number;
  booking_id: number;
  amount: number;
  method: PaymentType;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

// Extensions

export interface MovieWithScreenings extends Movie {
  screenings: Screening[];
}

export interface ApiSeat {
  id: number;
  row_number: string;
  seat_number: number;
  seat_type: SeatType;
  price: number;
  isBooked: boolean;
}

export interface BookingSummary {
  movieTitle: string;
  theaterName: string;
  date: string;
  time: string;
  seats: {
    seat_number: string;
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
