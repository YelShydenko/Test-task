import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const { role } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  return (
    <header className="header">
      <h2 className="header__title">Review App</h2>
      <nav>
        <ul className="header__navbar">
          {role && (
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
      {role && (
        <button className="header__btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
