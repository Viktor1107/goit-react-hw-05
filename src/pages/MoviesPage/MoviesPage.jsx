import { useState, useEffect } from "react";
import { fetchMoviesSearch } from "../../articles-api/articles-api.js";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams, Link } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchMoviesSearch(query);
          if (data.results.length === 0) {
            setError("No movies found.");
            setMovies([]);
          } else {
            setMovies(data.results);
          }
        } catch (error) {
          setError("Failed to fetch movies.");
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query });
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <NotFoundPage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
