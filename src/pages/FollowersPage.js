import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./follow.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FollowersPage() {
  const navigate = useNavigate();

  // Dummy data
  const followers = [
    {
      id: 1,
      name: "Ankit",
      username: "@ankit123",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      id: 2,
      name: "Rohit",
      username: "@rohit",
      image:
        "https://images.unsplash.com/photo-1502767089025-6572583495b4"
    },
    {
      id: 3,
      name: "Neha",
      username: "@neha",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    }
  ];

  return (
    <div className="container-fluid follow-bg">

      {/* HEADER */}

      <div className="d-flex align-items-center p-3 border-bottom">

        <FaArrowLeft
          size={18}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

        <h5 className="mx-auto fw-bold">
          Followers
        </h5>

      </div>

      {/* LIST */}

      {followers.map((user) => (
        <div
          key={user.id}
          className="follow-item"
        >
          <div className="d-flex align-items-center">

            <img
              src={user.image}
              className="follow-dp"
              alt=""
            />

            <div className="ms-3">
              <b>{user.name}</b>
              <div className="text-muted small">
                {user.username}
              </div>
            </div>

          </div>

          <button className="btn btn-outline-primary btn-sm">
            Follow
          </button>

        </div>
      ))}

    </div>
  );
}