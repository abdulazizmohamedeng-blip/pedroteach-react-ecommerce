import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function Auth() {
  let [mode, setMode] = useState("signup");
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let { signUp, login, user } = useAuth();
  function switchMode(mode) {
    setMode(mode);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function OnSubmit(data) {
    setError(null);
    let result = null;
    if (mode == "login") {
      result = login(data.email, data.password);
    } else {
      result = signUp(data.email, data.password);
    }
    if (!result.success) {
      setError(result.error);
    } else {
      navigate("/");
    }
  }
  let modeFormat = mode == "signup" ? "Sign Up" : "Login";

  if (user) {
    console.log("Found");
    navigate("/");
    return;
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1>{modeFormat}</h1>
          <form className="auth-form" onSubmit={handleSubmit(OnSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="form-input"
                id="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 character",
                  },
                })}
                type="password"
                className="form-input"
                id="password"
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {modeFormat}
            </button>
          </form>
          <div className="auth-switch">
            <p>
              {mode == "login"
                ? "Don't have an account "
                : "Alrady have an account "}

              <span
                className="auth-link"
                onClick={() => switchMode(mode == "login" ? "signup" : "login")}
              >
                {mode == "signup" ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
