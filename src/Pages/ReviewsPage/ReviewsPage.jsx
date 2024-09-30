import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Импортируем хуки Redux
import { addReview, deleteReview } from "../../store/slices/reviewsSlice"; // Импортируем действия из Redux
import UserReviewCard from "../../Components/UserReviewCard/UserReviewCard";
import "./ReviewsPage.scss";

const ReviewsPage = () => {
  // Список заранее созданных пользователей
  const initialUsers = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
    { id: 3, name: "User 3", email: "user3@example.com" },
    { id: 4, name: "User 4", email: "user4@example.com" },
    { id: 5, name: "User 5", email: "user5@example.com" },
    { id: 6, name: "User 6", email: "user6@example.com" },
    { id: 7, name: "User 7", email: "user7@example.com" },
  ];

  const dispatch = useDispatch(); // Хук для отправки действий
  const reviews = useSelector((state) => state.reviews.reviews); // Получаем отзывы из глобального состояния Redux
  const userRole = useSelector((state) => state.auth.role);

  // Для хранения рейтинга для каждого пользователя
  const [selectedRatings, setSelectedRatings] = useState(() => {
    const initialRatings = {};
    initialUsers.forEach((user) => {
      initialRatings[user.id] = 0; // Рейтинг по умолчанию для каждого пользователя
    });
    return initialRatings;
  });

  // Обработка выбора рейтинга для каждого пользователя
  const handleRatingChange = (userId, rating) => {
    setSelectedRatings({ ...selectedRatings, [userId]: rating });
  };

  // Добавление отзыва для каждого пользователя
  const handleAddReview = (data, user) => {
    const newReviewObject = {
      id: Date.now(),
      text: data.reviewText,
      rating: selectedRatings[user.id], // Используем рейтинг для конкретного пользователя
      author: JSON.parse(localStorage.getItem("user")).email,
      user: user.email, // Отзыв оставляется для выбранного пользователя
    };

    dispatch(addReview(newReviewObject)); // Добавляем отзыв через Redux

    // Сброс рейтинга после добавления отзыва
    setSelectedRatings({ ...selectedRatings, [user.id]: 0 });
  };

  // Удаление отзыва (только для админа)
  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id)); // Удаление отзыва через Redux
  };

  return (
    <section className="reviews__page">
      <h2>Reviews Page</h2>

      <div className="reviews__list">
        {/* Отображение пользователей с кнопкой "Добавить отзыв" */}
        {initialUsers.map((user) => {
          const userReviews = reviews.filter(
            (review) => review.user === user.email
          ); // Фильтрация отзывов по каждому пользователю

          return (
            <UserReviewCard
              key={user.id}
              user={user}
              reviews={userReviews}
              selectedRating={selectedRatings[user.id]}
              onRatingChange={(rating) => handleRatingChange(user.id, rating)}
              onAddReview={handleAddReview}
              onDeleteReview={handleDeleteReview}
              userRole={userRole}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ReviewsPage;
