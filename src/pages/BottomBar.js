import React from "react";
import { FaHome, FaUser, FaPlus } from "react-icons/fa";

export default function BottomBar() {
  return (
    <div className="bottom-bar d-flex justify-content-around align-items-center">

      <FaHome size={20} />

      <div className="center-btn">
        <FaPlus />
      </div>

      <FaUser size={20} />

    </div>
  );
}