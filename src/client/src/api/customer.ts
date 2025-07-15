import { Movie, MovieWithScreenings, ApiSeat, BookingSummary,ScreeningSeatData, Theater } from "../../../shared/types/type";

const movieBaseUrl = "http://localhost:3000/customer/movies";
const seatBaseUrl = "http://localhost:3000/customer/seats";
const bookingUrl = "http://localhost:3000/customer/bookings";
const theaterBaseUrl = "http://localhost:3000/customer/theaters";


async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(movieBaseUrl);
    return handleResponse<Movie[]>(response);
  } catch (error) {
    console.error("fetchMovies error:", error);
    throw error;
  }
}

export async function fetchNowShowingMovies(date?: string): Promise<Movie[]> {
  try {
    let url = `${movieBaseUrl}/now-showing`;
    if (date) url += `?date=${date}`;
    const response = await fetch(url);
    return handleResponse<Movie[]>(response);
  } catch (error) {
    console.error("fetchNowShowingMovies error:", error);
    throw error;
  }
}

export async function fetchUpcomingMovies(month?: number, year?: number): Promise<Movie[]> {
  try {
    let url = `${movieBaseUrl}/upcoming`;
    if (month && year) url += `?month=${month}&year=${year}`;
    const response = await fetch(url);
    return handleResponse<Movie[]>(response);
  } catch (error) {
    console.error("fetchUpcomingMovies error:", error);
    throw error;
  }
}

export async function fetchMovieById(id: number, day = 0): Promise<MovieWithScreenings> {
  try {
    const url = `${movieBaseUrl}/screenings?id=${id}&day=${day}`;
    const response = await fetch(url);
    return handleResponse<MovieWithScreenings>(response);
  } catch (error) {
    console.error("fetchMovieById error:", error);
    throw error;
  }
}


export async function fetchSeatsByScreening(screeningId: number): Promise<ScreeningSeatData> {
  try {
    const response = await fetch(`${seatBaseUrl}/screening/${screeningId}`);
    return handleResponse<ScreeningSeatData>(response);
  } catch (error) {
    console.error("fetchSeatsByScreening error:", error);
    throw error;
  }
}


export async function selectSeats(
  seatIds: number[],
  screeningId: number
): Promise<{ message: string; selected: number[] }> {
  try {
    const response = await fetch(`${seatBaseUrl}/selected`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seat_ids: seatIds, screening_id: screeningId }),
    });
    return handleResponse<{ message: string; selected: number[] }>(response);
  } catch (error) {
    console.error("selectSeats error:", error);
    throw error;
  }
}

/**
 * Book selected seats for a screening.
 * @param customer - Optional customer info (guest or registered)
 * @param screeningId - ID of the screening
 * @param seatIds - Selected seat IDs
 * @param status - Optional booking status (default: "pending")
 * @returns Object with new booking ID
 */
export async function bookSeats(
  customer: { id?: number; name?: string; phone?: string } | null,
  screeningId: number,
  seatIds: number[],
  status: string = "pending"
): Promise<{ id: number }> {
  try {
    const body: any = {
      screening_id: screeningId,
      seat_ids: seatIds,
      status,
    };
    if (customer) {
      if (customer.id) {
        body.customer = { id: customer.id };
      } else if (customer.name && customer.phone) {
        body.customer = { name: customer.name, phone: customer.phone };
      }
    }

    const response = await fetch(bookingUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return handleResponse<{ id: number }>(response);
  } catch (error) {
    console.error("bookSeats error:", error);
    throw error;
  }
}

export async function fetchBookingDetails(bookingId: number): Promise<BookingSummary> {
  try {
    const response = await fetch(`${bookingUrl}/${bookingId}`, {
      credentials: "include",
    });
    return handleResponse<BookingSummary>(response);
  } catch (error) {
    console.error("fetchBookingDetails error:", error);
    throw error;
  }
}


export async function fetchTheaters(): Promise<Theater[]> {
  try {
    const response = await fetch(theaterBaseUrl);
    return handleResponse<Theater[]>(response);
  } catch (error) {
    console.error("fetchTheaters error:", error);
    throw error;
  }
}