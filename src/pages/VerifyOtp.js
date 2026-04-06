import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile =
    location.state?.mobile || "";

  const [otp, setOtp] =
    useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  const handleVerify = () => {
    alert("OTP Verified");
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center">

      {/* Back */}

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
        Verify Phone Number
      </h2>

      <p className="text-center text-muted mb-4">
        We've sent a code to +91
        {mobile}
      </p>

      {/* OTP Boxes */}

      <div className="d-flex justify-content-center gap-2 mb-3">

        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) =>
              handleChange(e, index)
            }
            className="form-control text-center"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px"
            }}
          />
        ))}

      </div>

      <p className="text-center text-muted">
        Didn't receive code?
        Resend in 40s
      </p>

      {/* Verify Button */}

      <button
        className="btn w-100 rounded-pill mt-3"
        style={{
          background:
            "linear-gradient(to right, #b794f4, #9f7aea)",
          color: "white"
        }}
        onClick={handleVerify}
      >
        Verify
      </button>

    </div>
  );
}

export default VerifyOtp;