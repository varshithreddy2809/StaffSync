
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiMapPin,
} from "react-icons/fi";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    city: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!formData.age || Number(formData.age) <= 0) {
      newErrors.age = "Enter a valid age";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMessage("Form validated successfully. Backend integration is pending.");
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
            <h1>Join Our Team!</h1>
            <p>
              Create your employee account and manage
              your personal information through our
              Employee Service Portal.
            </p>
          </div>

          <div className="auth-footer">
            © 2026 Employee Service Portal
          </div>
        </div>

        <div className="auth-right">
          <div className="register-form-container">

            <div className="register-heading">
              <h2>Create Account</h2>
              <p>Enter your details to register.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              <div className="register-fields-grid">

                {/* First Name */}
                <div className="form-group">
                  <label>First Name</label>
                  <div className={`input-wrapper ${errors.firstname ? "input-error" : ""}`}>
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First name"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.firstname && <span className="error-message">{errors.firstname}</span>}
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label>Last Name</label>
                  <div className={`input-wrapper ${errors.lastname ? "input-error" : ""}`}>
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last name"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.lastname && <span className="error-message">{errors.lastname}</span>}
                </div>

                {/* Age */}
                <div className="form-group">
                  <label>Age</label>
                  <div className={`input-wrapper ${errors.age ? "input-error" : ""}`}>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.age && <span className="error-message">{errors.age}</span>}
                </div>

                {/* City */}
                <div className="form-group">
                  <label>City</label>
                  <div className={`input-wrapper ${errors.city ? "input-error" : ""}`}>
                    <FiMapPin className="input-icon" />
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

              </div>

              {/* Address */}
              <div className="form-group">
                <label>Address</label>
                <div className={`input-wrapper ${errors.address ? "input-error" : ""}`}>
                  <FiMapPin className="input-icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email Address</label>
                <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className={`input-wrapper ${errors.password ? "input-error" : ""}`}>
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label>Confirm Password</label>
                <div className={`input-wrapper ${errors.confirmPassword ? "input-error" : ""}`}>
                  <FiLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="register-button">
                <FiUserPlus />
                <span>Create Account</span>
              </button>

              {message && <p className="register-message">{message}</p>}

            </form>

            <div className="login-link">
              Already have an account?
              <Link to="/login"> Sign In</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
