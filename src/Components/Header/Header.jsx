import { NavLink, useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux"; 
import "./Header.scss"; 
import { logout } from "../../store/slices/authSlice"; 

const Header = () => {
  // Accessing the current user's role from the Redux store
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Using dispatch to send actions to the Redux store
  const navigate = useNavigate(); // Using navigate to programmatically redirect the user

  // Handler function for logging out the user
  const handleLogout = () => {
    dispatch(logout()); // Dispatches the logout action to clear user data from the store
    navigate("/"); // Redirects the user to the login page after logout
  };

  return (
    <header className="header">
      <h2 className="header__title">Review App</h2>
      <nav>
        <ul className="header__navbar">
          {role && ( // Conditionally rendering links if the user is logged in
            <>
              <li>
                <NavLink className="header__navbar-item" to="/profile">
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink className="header__navbar-item" to="/reviews">
                  Reviews
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {role && ( // Conditionally rendering the Logout button if the user is logged in
        <button className="header__btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
