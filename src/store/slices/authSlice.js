import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  email: "",
};

// Попытка загрузить данные из localStorage при инициализации
const storedUser = localStorage.getItem("user");
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  initialState.role = parsedUser.role;
  initialState.email = parsedUser.email;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state.email = action.payload.email;
      localStorage.setItem(
        "user",
        JSON.stringify({ role: state.role, email: state.email })
      );
    },
    logout: (state) => {
      state.role = null;
      state.email = "";
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
