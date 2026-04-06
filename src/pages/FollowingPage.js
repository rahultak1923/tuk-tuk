import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./follow.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FollowingPage() {
  const navigate = useNavigate();

  const following = [
    {
      id: 1,
      name: "Rahul",
      username: "@rahul",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    {
      id: 2,
      name: "Simran",
      username: "@simran",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
    }
  ];

  return (
    <div className="container-fluid follow-bg">

      <div className="d-flex align-items-center p-3 border-bottom">

        <FaArrowLeft
          size={18}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />

        <h5 className="mx-auto fw-bold">
          Following
        </h5>

      </div>

      {following.map((user) => (
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

          <button className="btn btn-outline-danger btn-sm">
            Following
          </button>

        </div>
      ))}

    </div>
  );
}