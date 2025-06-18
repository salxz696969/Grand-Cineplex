export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  duration: string;
  image: string;
}

const host = 'http://localhost:4000/movies';

// Use it to fetch all movie to display
export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(host);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return await response.json();
}
