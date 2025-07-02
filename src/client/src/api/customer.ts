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
export async function fetchUpcomingMovies(): Promise<Movie[]> {
  try{
      const response = await fetch(`${baseUrl}/upcoming`);
      if (!response.ok) throw new Error("Failed to fetch upcoming movies");
      return await response.json();
  }catch(err){
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