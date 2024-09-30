import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import "./UserReviewCard.scss";

const UserReviewCard = ({
  user,
  reviews,
  selectedRating,
  onRatingChange,
  onAddReview,
  onDeleteReview,
  userRole,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Создание useForm для каждого пользователя

  // Средний рейтинг для пользователя
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="user__card">
      <div className="user__card-title">
        <h3>
          {user.name} ({user.email})
        </h3>
        <p>
          Average Rating: <span className="average__rating-score">{averageRating}</span>
        </p>
      </div>

      <div className="user__card-body">
        <div className="review__form-container">
          {/* Отображение звёзд для выбора оценки */}
          <div className="stars__container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`star ${
                  star <= selectedRating ? "active" : "inactive"
                }`} // Динамическое применение классов
                onClick={() => onRatingChange(star)} // Устанавливаем рейтинг для текущего пользователя
              />
            ))}
          </div>

          {/* Форма для добавления отзыва для конкретного пользователя */}
          <form
            className="review__form"
            onSubmit={handleSubmit((data) => {
              onAddReview(data, user); // Добавление отзыва
              reset(); // Сброс формы после отправки
            })}
          >
            <textarea
              className="review__form-area"
              {...register("reviewText", { required: "Review is required" })}
              placeholder="Leave a review"
            />
            {errors.reviewText && <p>{errors.reviewText.message}</p>}

            <button className="review__form-button" type="submit">
              Add Review
            </button>
          </form>
        </div>

        <div className="reviews__user-list">
          <h4>Reviews:</h4>
          {/* Отображение отзывов для каждого пользователя */}
          <ol className="user__reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review.id}>
                  <p className="review__content">
                    {review.text} -{" "}
                    <span className="review__accent-star">{review.rating}</span>{" "}
                    stars <br />
                    by{" "}
                    <span className="review__accent-author">
                      {review.author}
                    </span>
                  </p>
                  {userRole === "admin" && (
                    <button className="admin__button" onClick={() => onDeleteReview(review.id)}>
                      Delete
                    </button>
                  )}
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserReviewCard;
