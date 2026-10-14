import { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        " https://school-project-ql8x.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      const role = response.data.user.role;

      // Role ke according dashboard
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "staff") {
        window.location.href = "/staff";
      } else if (role === "student") {
        window.location.href = "/student";
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>School Management System</h2>
        <p>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Login
          </button>
        </form>

       {/*  <p className="register-text">
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;