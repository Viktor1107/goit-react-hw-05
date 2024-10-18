import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div className={s.wrap}>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={
                  !movie.poster_path ||
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                alt={movie.title}
                width={350}
              />
              <p>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
