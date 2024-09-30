import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: JSON.parse(localStorage.getItem("reviews")) || [], // Retrieve stored reviews or initialize with an empty array
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState, 
  reducers: {
    // Action for adding a new review
    addReview: (state, action) => {
      state.reviews.push(action.payload); // Add the new review to the state
      localStorage.setItem("reviews", JSON.stringify(state.reviews)); // Save the updated reviews array to localStorage
    },

    // Action for deleting a review
    deleteReview: (state, action) => {
      // Filter out the review with the specified ID
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload
      );
      localStorage.setItem("reviews", JSON.stringify(state.reviews)); // Save the updated reviews array to localStorage
    },
  },
});

export const { addReview, deleteReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;
