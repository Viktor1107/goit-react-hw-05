import { useEffect, useState } from "react";
import s from "./MovieReviews.module.css";
import { fetchMoviesReviews } from "/src/articles-api/articles-api.js";
import { useParams } from "react-router-dom";

function MovieReviews() {
  const { movieId } = useParams;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMoviesReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={s.container}>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.author}:</strong> {review.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}

export default MovieReviews;
