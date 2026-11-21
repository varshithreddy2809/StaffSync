
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
} from "react-icons/fi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:8081/api/admin/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const token = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("adminEmail", formData.email.trim());

      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("Unable to connect to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="brand-logo">EMS</div>
            <h2>Employee Portal</h2>
          </div>

          <div className="auth-welcome">
            <h1>Welcome Back!</h1>
            <p>
              Manage your employee information, access your profile,
              and stay connected with your organization.
            </p>
          </div>

          <div className="auth-footer">
            © 2026 Employee Service Portal
          </div>
        </div>

        <div className="auth-right">
          <div className="login-form-container">
            <div className="login-heading">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                <FiLogIn />
                <span>{loading ? "Signing In..." : "Sign In"}</span>
              </button>

              {message && (
                <p className="login-message">{message}</p>
              )}
            </form>

            <div className="register-link">
              Don't have an account?
              <Link to="/register"> Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
