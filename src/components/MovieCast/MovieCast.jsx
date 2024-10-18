import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { fetchMoviesCredits } from "../../articles-api/articles-api.js";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await fetchMoviesCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={s.container}>
      <h2>Cast</h2>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "${actor.name}"
              }
              alt={actor.title}
              width={100}
            />
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
