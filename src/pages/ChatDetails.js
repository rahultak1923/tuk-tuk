import React from "react";
import { useLocation } from "react-router-dom";
import "./chatDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { Home as HomeIcon, MessageCircle, User, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

export default function ChatDetails() {
  const { state } = useLocation();
    const navigate = useNavigate();
  return (
    <div className="chat-detail">

      {/* HEADER */}
      <div className="chat-top d-flex align-items-center px-3">
        <FaArrowLeft className="me-3" />
        <img src={state?.img} className="top-img" />
        <h6 className="mb-0 ms-2">{state?.name}</h6>
      </div>

      {/* CHAT AREA */}
      <div className="chat-body">

        {/* MESSAGE LEFT */}
        <div className="chat-row">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="msg-img"
          />

          <div className="msg-bubble">
            Real ho tum?
          </div>
        </div>

      </div>

      {/* INPUT */}
      <div className="chat-input px-3 d-flex align-items-center">
        <input placeholder="Type a message..." />
        <button>Send</button>
      </div>
{/* BOTTOM NAV */}
            <div className="bottom-nav">
              <div className="nav-item " onClick={() => navigate("/home")}><HomeIcon size={24} /><div>Home</div></div>
              <div className="nav-item " onClick={() => navigate("/party")}><Mic size={24} /><div>Party</div></div>
              <div className="nav-item active" onClick={() => navigate("/chat")}><MessageCircle size={24} /><div>Chat <span className="dot" /></div></div>
              <div className="nav-item" onClick={() => navigate("/profile")}><User size={24} /><div>Mine</div></div>
            </div>
    </div>
    
  );
}