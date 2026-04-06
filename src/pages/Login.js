import React, { useState } from "react";
import { FaFacebookF, FaApple, FaWeixin, FaPhone } from "react-icons/fa";
import "./Login.css";
import { API_URLS } from "../constants/apiConstants";

const Login = () => {
  const [accepted, setAccepted] = useState(false);

  const handleGoogleLogin = () => {
    if (!accepted) {
      alert("Please accept Terms and Privacy Policy");
      return;
    }
    // Redirect to backend Google OAuth endpoint
    window.location.href = API_URLS.GOOGLE_LOGIN;
    
  };

  const handleFacebookLogin = () => {
    if (!accepted) {
      alert("Please accept Terms and Privacy Policy");
      return;
    }
    console.log("Facebook login clicked");
  };

  return (
    <div className="login-bg">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center text-white login-card">
          {/* Logo */}
          <img src="/assets/bunny.png" alt="logo" className="logo" />
          <h1 className="title">Tuk Tuk</h1>
          <h2 className="users-count">13,365,176</h2>
          <p className="subtitle">user made friends here</p>

          {/* Facebook Button */}
          <button className="glass-button mt-4" onClick={handleFacebookLogin}>
            <div className="icon-circle">
              <FaFacebookF />
            </div>
            Sign in with Facebook
          </button>

          {/* Google Button */}
          <button className="glass-button mt-3" onClick={handleGoogleLogin}>
            <img src="/assets/google_logo.png" alt="google" height="24" />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="divider mt-4">
            <span>More login options</span>
          </div>

          {/* Icons */}
          <div className="d-flex justify-content-center gap-4 mt-4">
            <div className="circle-option"><FaPhone /></div>
            <div className="circle-option"><FaApple /></div>
            <div className="circle-option"><FaWeixin /></div>
          </div>

          {/* Checkbox */}
          <div className="form-check mt-5 text-start checkbox-area">
            <input
              type="checkbox"
              className="form-check-input"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label className="form-check-label">
              I agree to the <strong>Terms and Conditions</strong> and{" "}
              <strong>Privacy Policy</strong>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;