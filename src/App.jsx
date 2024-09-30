import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ReviewsPage from "./Pages/ReviewsPage/ReviewsPage";
import Login from "./Components/Login/Login";
import "./App.css";

function App() {
  return (
    // Defining routes using React Router
    <Routes>
      {/* Wrapping all routes with a common Layout component */}
      <Route path="/" element={<Layout />}>
        {/* Route for the login page */}
        <Route index path="/login" element={<Login />} />
        {/* Route for the profile page */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* Route for the reviews page */}
        <Route path="/reviews" element={<ReviewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
