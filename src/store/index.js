import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Редьюсер для авторизации
import reviewsReducer from "./slices/reviewsSlice"; // Редьюсер для отзывов

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
  },
});

export default store;
