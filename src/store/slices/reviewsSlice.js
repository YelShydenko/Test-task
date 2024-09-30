import { createSlice } from "@reduxjs/toolkit";

// Изначальное состояние загружается из localStorage
const initialState = {
  reviews: JSON.parse(localStorage.getItem("reviews")) || [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
      localStorage.setItem("reviews", JSON.stringify(state.reviews)); // Сохранение данных в localStorage
    },
    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload
      );
      localStorage.setItem("reviews", JSON.stringify(state.reviews)); // Обновление данных в localStorage
    },
  },
});

export const { addReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
