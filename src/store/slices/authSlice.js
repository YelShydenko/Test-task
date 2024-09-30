import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  role: null, 
  email: "", 
};

// Attempt to load stored user data from localStorage during initialization
const storedUser = localStorage.getItem("user");
if (storedUser) {
  const parsedUser = JSON.parse(storedUser); // Parse the user data from localStorage
  initialState.role = parsedUser.role; // Set the user's role from localStorage
  initialState.email = parsedUser.email; // Set the user's email from localStorage
}


const authSlice = createSlice({
  name: "auth", 
  initialState, 
  reducers: {
    // Action for logging in
    login: (state, action) => {
      state.role = action.payload.role; // Set the role from the action payload
      state.email = action.payload.email; // Set the email from the action payload
      // Store the user data in localStorage for persistence
      localStorage.setItem(
        "user",
        JSON.stringify({ role: state.role, email: state.email })
      );
    },
    // Action for logging out
    logout: (state) => {
      state.role = null; // Reset the role to null
      state.email = ""; // Reset the email to an empty string
      // Remove the user data from localStorage to log the user out
      localStorage.removeItem("user");
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
