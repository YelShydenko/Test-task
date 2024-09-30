import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { addReview, deleteReview } from "../../store/slices/reviewsSlice"; 
import UserReviewCard from "../../Components/UserReviewCard/UserReviewCard"; 
import "./ReviewsPage.scss"; 
const ReviewsPage = () => {
  // Predefined list of users
  const initialUsers = [
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
    { id: 3, name: "User 3", email: "user3@example.com" },
    { id: 4, name: "User 4", email: "user4@example.com" },
    { id: 5, name: "User 5", email: "user5@example.com" },
    { id: 6, name: "User 6", email: "user6@example.com" },
    { id: 7, name: "User 7", email: "user7@example.com" },
  ];

  const dispatch = useDispatch(); // Hook for dispatching Redux actions
  const reviews = useSelector((state) => state.reviews.reviews); // Getting reviews from the Redux store
  const userRole = useSelector((state) => state.auth.role); // Getting the current user's role from the Redux store

  // Storing the selected rating for each user
  const [selectedRatings, setSelectedRatings] = useState(() => {
    const initialRatings = {}; // Initializing ratings for each user
    initialUsers.forEach((user) => {
      initialRatings[user.id] = 1; // Default rating is set to 1 star
    });
    return initialRatings;
  });

  // Handling rating selection for each user
  const handleRatingChange = (userId, rating) => {
    setSelectedRatings({ ...selectedRatings, [userId]: rating }); // Updating the selected rating for the given user
  };

  // Adding a review for a specific user
  const handleAddReview = (data, user) => {
    const newReviewObject = {
      id: Date.now(), // Unique ID based on timestamp
      text: data.reviewText, // The text of the review from form data
      rating: selectedRatings[user.id], // The rating for the specific user
      author: JSON.parse(localStorage.getItem("user")).email, // Getting the logged-in user's email from localStorage
      user: user.email, // The review is being left for this specific user
    };

    dispatch(addReview(newReviewObject)); // Dispatching the action to add a review in Redux

    // Resetting the selected rating after adding a review
    setSelectedRatings({ ...selectedRatings, [user.id]: 1 });
  };

  // Deleting a review (only for admin)
  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id)); // Dispatching the action to delete a review in Redux
  };

  return (
    <section className="reviews__page">
      <h2>Reviews Page</h2>
      <div className="reviews__list">
        {initialUsers.map((user) => {
          const userReviews = reviews.filter(
            (review) => review.user === user.email
          );
          return (
            <UserReviewCard
              key={user.id} // Unique key for each user
              user={user} // Passing the user object to the UserReviewCard component
              reviews={userReviews} // Passing the filtered reviews for this user
              selectedRating={selectedRatings[user.id]} // Passing the selected rating for this user
              onRatingChange={(rating) => handleRatingChange(user.id, rating)} // Handling rating change for this user
              onAddReview={handleAddReview} // Handling review submission for this user
              onDeleteReview={handleDeleteReview} // Handling review deletion (only for admin)
              userRole={userRole} // Passing the current user's role (admin/user) to control access to deleting reviews
            />
          );
        })}
      </div>
    </section>
  );
};

export default ReviewsPage;
