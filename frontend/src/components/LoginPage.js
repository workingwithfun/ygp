import React, { useState, useEffect } from "react";
import { FaGoogle, FaLinkedin, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import "./style.css";


const LoginPage = ({ setIsAuthenticated }) => {
  const [isSignup, setIsSignup] = useState(false); // Toggle for login/signup
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Toggle for password reset
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
/*
  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/users/csrf-token/', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };

    getCsrfToken();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      console.error('Login failed:', data);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/users/signup/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! Please log in.");
      setIsSignup(false);
    } else {
      console.error('Signup failed:', data);
    }
  };

  // Handle Password Reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:8000/api/users/reset-password/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ email: formData.email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password reset link has been sent to your email.");
      setIsForgotPassword(false); // Switch back to login after request
    } else {
      console.error('Reset password failed:', data);
    }
  };

*/

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img
          src="https://img.freepik.com/premium-vector/girl-with-laptop-is-working-office-girl-is-browsing-internet-conversations_647843-112.jpg"
          alt="Login"
        />
      </div>

      <div className="auth-box">
        <h2>
          {isForgotPassword ? "Reset Password" : isSignup ? "Sign Up" : "Login"}
        </h2>

        <button className="auth-google-btn" >
          <FaGoogle /> {isSignup ? "Sign up" : "Sign in"} with Google
        </button>
        <button className="auth-linkedin-btn">
          <FaLinkedin /> {isSignup ? "Sign up" : "Sign in"} with LinkedIn
        </button>

        <p>OR</p>

        {/* Reset Password Form */}
        {isForgotPassword ? (
          <form>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
             
              required
              className="auth-input"
            />

            <button type="submit" className="auth-login-btn">
              Send Reset Link
            </button>

            <p className="auth-toggle-text">
              Remembered your password?{" "}
              <span onClick={() => setIsForgotPassword(false)} className="auth-toggle-link">
                Login
              </span>
            </p>
          </form>
        ) : (
          <form >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              
              required
              className="auth-input"
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
              
                required
                className="input-field"
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {isSignup && (
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  
                  required
                  className="input-field"
                />
                <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            )}

            <button type="submit" className="auth-login-btn">
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>
        )}

        {!isForgotPassword && (
          <p className="auth-toggle-text">
            <span onClick={() => setIsForgotPassword(true)} className="auth-toggle-link">
              Forgot Password?
            </span>
          </p>
        )}

        {!isForgotPassword && (
          <p className="auth-toggle-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)} className="auth-toggle-link">
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
