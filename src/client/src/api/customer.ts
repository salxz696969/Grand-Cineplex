import { Movie } from "../../../shared/types/type";

const baseUrl = 'http://localhost:3000/customer/movies';


// Fetch all movie
export async function fetchMovies(): Promise<Movie[]> {
  try{
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
  return await response.json();
  }catch(err){
    console.log(err);
    throw err;
  }
}

// Fetch current show movie
export async function fetchNowShowingMovies(): Promise<Movie[]> {
  try{
      const response = await fetch(`${baseUrl}/now-showing`);
      if (!response.ok) throw new Error("Failed to fetch now showing movies");
      return await response.json();
  }catch(err){
    console.log(err);
    throw err;
  }
}

// Fetch upcoming movie
export async function fetchUpcomingMovies(month?: number, year?: number): Promise<Movie[]> {
  try {
    let url = `${baseUrl}/upcoming`;

    // Append query params if month and year are provided
    if (month && year) {
      url += `?month=${month}&year=${year}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch upcoming movies");

    return await response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function fetchTopRatedMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${baseUrl}/top-rated`);
    if (!response.ok) throw new Error("Failed to fetch top rated movies");
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchMovieById(id: number): Promise<Movie> {
  try{
      const response = await fetch(`${baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movie with id ${id}`);
      }
    const movie: Movie = await response.json();
    return movie;
  }catch(err){
    console.error(err);
    throw err;
  }
}

