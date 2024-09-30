import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../../store/slices/authSlice";
import { auth, provider, signInWithPopup } from "../../firebase";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch(); // Initializing the useDispatch hook to dispatch actions
  const { role, email } = useSelector((state) => state.auth); // Accessing the current role and email from the Redux auth state

  // Initializing the form handling with react-hook-form
  const {
    register, // Registering input fields
    handleSubmit, // Handler for form submission
    formState: { errors }, // Accessing validation errors
  } = useForm();

  // useEffect to check if there is a stored user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Parsing the user data from localStorage
      dispatch(login(parsedUser)); // Dispatching the login action with the stored user
    }
  }, [dispatch]); // Dependency array ensures this runs only once when the component mounts

  // Form submit handler for email/password login
  const onSubmit = (data) => {
    // Checking if the user is an admin based on hardcoded credentials
    const isAdmin =
      data.email === "admin@admin.com" && data.password === "admin";
    // Dispatching the login action with the role and email
    dispatch(login({ role: isAdmin ? "admin" : "user", email: data.email }));
  };

  // Handler for Google login using Firebase
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Initiating Google login via Firebase
      const user = result.user; // Extracting user info from the result
      const isAdmin = user.email === "admin@admin.com"; // Checking if the logged-in user is an admin
      // Dispatching the login action with the role and email
      dispatch(login({ role: isAdmin ? "admin" : "user", email: user.email }));
      // Storing the user data in localStorage for persistence
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, role: isAdmin ? "admin" : "user" })
      );
    } catch (error) {
      console.error("Error with Google login:", error); // Logging any errors during the Google login process
    }
  };

  return (
    <div>
      {role ? ( // If the user is logged in, show the welcome message and logout button
        <div className="login__message">
          <p>
            Welcome, {email}! You are logged in as {role}.
          </p>
          <button className="login__btn" onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      ) : (
        // If the user is not logged in, show the login form
        <div className="login__form">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input
              {...register("email", {
                required: "Email is required", // Field is required
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Regular expression for email validation
                  message: "Invalid email address", // Error message for invalid email
                },
              })} // Registering the email input field with validation
              placeholder="Email"
              className="form__item"
            />
            {errors.email && ( // Displaying error message if email validation fails
              <span className="form__error">{errors.email.message}</span>
            )}
            <input
              {...register("password", { required: "Password is required" })} // Registering the password input field with validation
              type="password"
              placeholder="Password"
              className="form__item"
            />
            {errors.password && (
              <span className="form__error">{errors.password.message}</span>
            )}
            <button className="login__btn" type="submit">
              Login
            </button>
          </form>

          <div className="google__container">
            {/* Button to initiate Google login */}
            <button className="login__btn google" onClick={handleGoogleLogin}>
              Login with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
