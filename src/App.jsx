import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ProfilePage from "./Pages/ProfilePage/ProfilePAge";
import ReviewsPage from "./Pages/ReviewsPage/ReviewsPage";
import Login from "./Components/Login/Login";
import "./App.css";

function App() {
  return ( 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    
  );
}

export default App;
