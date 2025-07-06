import axios from "axios";

type MovieData ={
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
}

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

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
		const response = await axios.get(
			`${API_BASE_URL}/manager/movies/recently-added`
		);
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

export const addMovie= async (movieData: MovieData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/manager/movies`, movieData);
        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
}

export const updateMovie = async (movieData: MovieData) => {
    try {
        console.log("Updating movie with data:", movieData);
        const response = await axios.patch(`${API_BASE_URL}/manager/movies`, movieData);
        return response.data;
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
}