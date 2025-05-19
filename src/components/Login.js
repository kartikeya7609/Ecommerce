import React from "react";
import "../App.css";
import "./Login.css";
export default function Login() {
  return (
    <>
      <div className="login-container d-flex align-items-center justify-content-center vh-100 login-bg">
        <div className="login-card p-5 rounded-5 shadow-lg text-white">
          <h2 className="text-center mb-3 fw-bold">Welcome Back 👋</h2>
          <p className="text-center mb-4">
            Don't have an account?{" "}
            <a href="/register" className="text-info fw-semibold">
              Register Now
            </a>
          </p>

          <form autoComplete="on">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control bg-transparent text-white border-white"
                id="username"
                placeholder="Username"
                required
                autoComplete="username"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              />
              <label htmlFor="username" className="text-white">
                Username
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control bg-transparent text-white border-white"
                id="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              />
              <label htmlFor="password" className="text-white">
                Password
              </label>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-light fw-semibold py-2"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            <a href="/forgot" className="text-light text-decoration-underline">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
