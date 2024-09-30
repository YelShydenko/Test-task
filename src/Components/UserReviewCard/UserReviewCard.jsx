import { useForm } from "react-hook-form"; 
import { FaStar } from "react-icons/fa"; 
import "./UserReviewCard.scss"; 

const UserReviewCard = ({
  user, // The user object containing the user's information (name, email)
  reviews, // The array of reviews associated with this user
  selectedRating, // The currently selected rating for the review being added
  onRatingChange, // Function to handle changing the rating
  onAddReview, // Function to handle adding a new review
  onDeleteReview, // Function to handle deleting a review (admin only)
  userRole, // The role of the current logged-in user (admin or user)
}) => {
  // Initializing the useForm hook for form handling and validation
  const {
    register, // Registering input fields
    handleSubmit, // Handler for form submission
    formState: { errors }, // Accessing form validation errors
    reset, // Function to reset the form after submission
  } = useForm();

  // Function to calculate the average rating for this user
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0; // If there are no reviews, return 0
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0); // Summing up all review ratings
    return (totalRating / reviews.length).toFixed(1); // Calculating the average and returning it with one decimal
  };

  const averageRating = calculateAverageRating(); // Calculating average rating for the user

  return (
    <div className="user__card">
      <div className="user__card-title">
        <h3>
          {user.name} ({user.email}) 
        </h3>
        <p>
          Average Rating:{" "}
          <span className="average__rating-score">{averageRating}</span>
        </p>
      </div>

      <div className="user__card-body">
        <div className="review__form-container">
          <div className="stars__container">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star} // Assigning a unique key for each star
                className={`star ${
                  star <= selectedRating ? "active" : "inactive"
                }`} // Conditionally applying classes for active/inactive stars
                onClick={() => onRatingChange(star)} // Setting the selected rating when a star is clicked
              />
            ))}
          </div>

          <form
            className="review__form"
            onSubmit={handleSubmit((data) => {
              onAddReview(data, user); // Calling onAddReview function with the review data and user info
              reset(); // Resetting the form fields after successful submission
            })}>
            <textarea
              className="review__form-area"
              {...register("reviewText", { required: "Review is required" })} // Registering textarea and adding validation rule
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
          {/* List of user reviews */}
          <ol className="user__reviews">
            {reviews.length > 0 ? ( // If there are reviews, map over them and render each review
              reviews.map((review) => (
                <li key={review.id}>
                  <p className="review__content">
                    {review.text} -{" "}
                    <span className="review__accent-star">{review.rating}</span>
                    stars <br />
                    by{" "}
                    <span className="review__accent-author">
                      {review.author}
                    </span>
                  </p>
                  {userRole === "admin" && ( // If the user is an admin, show the delete button
                    <button
                      className="admin__button"
                      onClick={() => onDeleteReview(review.id)} // Calling onDeleteReview with the review ID
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))
            ) : (
              <p>No reviews yet.</p> // If there are no reviews, show a message
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserReviewCard;
