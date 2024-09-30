import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"; 
import "./Login.scss";
import { useEffect } from "react";
import { login, logout } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { role, email } = useSelector((state) => state.auth); // Получаем состояние авторизации из Redux
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(login(parsedUser)); // Восстанавливаем пользователя, если он есть в localStorage
    }
  }, [dispatch]);

  const onSubmit = (data) => {
    const isAdmin =
      data.email === "admin@admin.com" && data.password === "admin";
    dispatch(login({ role: isAdmin ? "admin" : "user", email: data.email }));
  };

  return (
    <div>
      {role ? (
        <div className="login__message">
          <p>
            Welcome, {email}! You are logged in as {role}.
          </p>
          <button className="login__btn" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="form__item"
          />
          {errors.email && (
            <span className="form__error">{errors.email.message}</span>
          )}
          <input
            {...register("password", { required: "Password is required" })}
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
      )}
    </div>
  );
};

export default Login;
