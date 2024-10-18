import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EwZDMwYTMxZWZiNmIxMmFmMmVhYjRiMTUyMzY2MyIsIm5iZiI6MTcyOTAyMzQxNi4wNDQ2NzcsInN1YiI6IjY3MGVjOWU4MzczZGIyMjM3OWMyNWQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.96AwmjM7qiF9szZSIYUVc4JK9GcyvtSMT2jtGm_Zxwo";

const options = {
  headers: {
    Authorization: `Bearer ${KEY}`,
  },
};

export const fetchMoviesTrending = async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1",
    options
  );
  return data;
};

export const fetchMoviesSearch = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data;
};

export const fetchMoviesDetails = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return data;
};

export const fetchMoviesCredits = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data;
};

export const fetchMoviesReviews = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return data;
};

// function HomePage() {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMoviesTrending = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`
//         );
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (
//     <div>
//       <h1>Trending Movies</h1>
//       <MovieList movies={movies} />
//     </div>
//   );
// }

// export default HomePage;
