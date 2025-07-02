import axios from "axios";

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
import { get } from 'http';

// FUNCTIONS TO GET DATA FROM THE API ============================================

export const getMoviesFor7Days = async () => {
	try {
        console.log(API_BASE_URL)
		const response = await axios.get(`${API_BASE_URL}/cashier/movies`);
		return response.data;
	} catch (error) {
		console.error("Error fetching movies for 7 days:", error);
		throw error;
	}
};

export const getMovieAndScreeningBasedOnId= async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cashier/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie and screening based on ID:", error);
        throw error;
    }
}

export const getSeatsBasedOnScreeningId = async (screeningId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cashier/seats/available-seats/${screeningId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching seats based on screening ID:", error);
        throw error;
    }
}  

export const getMoviesAndItsScreenings = async (screeningId:number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cashier/showtimes/${screeningId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies and their screenings:", error);
        throw error;
    }
}