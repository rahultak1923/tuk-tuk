import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterMobile() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (mobile.length === 10) {
      navigate("/verify-otp", {
        state: { mobile }
      });
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center">

      {/* Back Arrow */}
      <div className="mb-4">
        <span
          style={{ fontSize: "24px", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          ←
        </span>
      </div>

      {/* Title */}
      <h2 className="fw-bold text-center">
        Welcome to Tuk Tuk
      </h2>

      <p className="text-center text-muted mb-4">
        Meet friends with common interests
      </p>

      {/* Mobile Input */}
      <div className="mb-3">

        <label className="form-label">
          WhatsApp number
        </label>

        <div className="input-group">

          <span className="input-group-text">
            🇮🇳 +91
          </span>

          <input
            type="tel"
            maxLength="10"
            className="form-control"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
          />

        </div>

        <div className="text-end text-muted">
          {mobile.length}/10
        </div>

      </div>

      {/* Next Button */}

      <button
        className="btn btn-secondary w-100 rounded-pill mt-3"
        disabled={mobile.length !== 10}
        onClick={handleNext}
      >
        Next
      </button>

      {/* Divider */}

      <div className="text-center my-4 text-muted">
        ───── Other login ways ─────
      </div>

      {/* Social Buttons */}

      <div className="d-flex gap-3">

        <button className="btn btn-primary w-100 rounded-pill">
          Facebook
        </button>

        <button className="btn btn-primary w-100 rounded-pill">
          Google
        </button>

      </div>

      <p className="text-center text-muted mt-4">
        Your account info will only be used for log in
      </p>

    </div>
  );
}

export default EnterMobile;