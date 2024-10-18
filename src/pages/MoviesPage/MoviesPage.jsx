import { useState } from "react";
import { fetchMoviesSearch } from "../../articles-api/articles-api.js";
import MovieList from "../../components/MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (searchQuery = query) => {
    try {
      const data = await fetchMoviesSearch(searchQuery);

      if (data.results.length === 0) {
        navigate("/notfound");
      } else {
        setMovies(data.results);
        navigate(`?query=${searchQuery}`);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch();
    }
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
