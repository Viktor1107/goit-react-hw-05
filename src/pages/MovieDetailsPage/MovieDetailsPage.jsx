import { useEffect, useState, useRef } from "react";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import { fetchMoviesDetails } from "../../articles-api/articles-api.js";
import s from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetchMoviesDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={s.container}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : movie.backdrop_path
        }
        alt={movie.title}
        width={200}
      />
      <h1>
        {movie.title} ({new Date(movie.release_date).getFullYear()})
      </h1>
      <p>{movie.overview}</p>

      <nav>
        <ul className={s.links}>
          <li>
            <Link
              to={`/movies/${movieId}/cast`}
              state={{ from: goBackRef.current }}
              className={location.pathname.includes("/cast")}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieId}/reviews`}
              className={location.pathname.includes("/reviews")}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
