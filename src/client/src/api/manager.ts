import axios from "axios";

type MovieData = {
	id?: number; // Optional for new movies
	title: string;
	description: string;
	posterUrl: string;
	trailerUrl: string;
	duration: string;
	genre: string;
	rating: number;
	releaseDate: string;
	director: string;
	cast: string;
	language: string;
};

const API_BASE_URL = "http://localhost:6900";

export const getHomePageInfo = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/home`);
		return response.data;
	} catch (error) {
		console.error("Error fetching home page info:", error);
		throw error;
	}
};
export const getRecentlyAddedMovies = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/movies/recently-added`);
		return response.data;
	} catch (error) {
		console.error("Error fetching upcoming screening count:", error);
		throw error;
	}
};

export const getAllMovies = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/movies`);
		return response.data;
	} catch (error) {
		console.error("Error fetching all movies:", error);
		throw error;
	}
};

export const addMovie = async (movieData: MovieData) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/manager/movies`, movieData);
		return response.data;
	} catch (error) {
		console.error("Error adding movie:", error);
		throw error;
	}
};

export const updateMovie = async (movieData: MovieData) => {
	try {
		console.log("Updating movie with data:", movieData);
		const response = await axios.patch(`${API_BASE_URL}/manager/movies`, movieData);
		return response.data;
	} catch (error) {
		console.error("Error updating movie:", error);
		throw error;
	}
};

export const getTodayShowTimes = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/showtimes`);
		return response.data;
	} catch (error) {
		console.error("Error fetching today's showtimes:", error);
		throw error;
	}
};

export const getAllStaff = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/staff`);
		return response.data;
	} catch (error) {
		console.error("Error fetching staff data:", error);
		throw error;
	}
};

export const addStaff = async (staffData: any) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/manager/staff`, staffData);
		return response.data;
	} catch (error) {
		console.error("Error adding staff:", error);
		throw error;
	}
};

export const getTheaters = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/theaters`);
		return response.data;
	} catch (error) {
		console.error("Error fetching theaters:", error);
		throw error;
	}
};

export const addTheater = async (theaterData: any) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/manager/theaters`, theaterData);
		return response.data;
	} catch (error) {
		console.error("Error adding theater:", error);
		throw error;
	}
};

export const getBookings = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/manager/bookings`);
		return response.data;
	} catch (error) {
		console.error("Error fetching bookings:", error);
		throw error;
	}
};

export const addScreening = async (screeningData: any) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/manager/showtimes`, screeningData);
		return response.data;
	} catch (error) {
		console.error("Error adding screening:", error);
		throw error;
	}
};

export const deleteMovie = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/manager/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

export const deleteScreening = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/manager/showtimes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting screening:", error);
    throw error;
  }
}

export const updateScreening = async (screeningData: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/manager/showtimes/${screeningData.id}`, screeningData);
    return response.data;
  } catch (error) {
    console.error("Error updating screening:", error);
    throw error;
  }
}