import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chat.css";
import { Home as HomeIcon, MessageCircle, User, Mic } from "lucide-react";

import {
  FaSearch,
  FaUserPlus,
  FaLayerGroup,
  FaBars,
  FaUsers,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();

  const chats = [
    {
      name: "Reward Assistant",
      msg: "Rewards received! Check...",
      img: "https://img.icons8.com/3d-fluency/94/gift.png",
      time: "12:00 PM",
      count: 8,
    },
    {
      name: "Event",
      msg: "[Activity]",
      img: "https://img.icons8.com/color/96/holding-hands.png",
      time: "Yesterday",
      count: 0,
    },
    {
      name: "Achat Official",
      msg: "[Activity]",
      img: "https://img.icons8.com/color/96/holding-hands.png",
      time: "",
      count: 27,
    },
    {
      name: "Cutie Pie 😊",
      msg: "Real leaving?",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      time: "Yesterday",
      count: 1,
    },
    {
      name: "Sanam",
      msg: "Hello there!",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      time: "10:30 AM",
      count: 0,
    },
    {
      name: "Kunal",
      msg: "Let's play ludo",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      time: "09:15 AM",
      count: 3,
    },
  ];

  const users = [
    {
      name: "★ KHUS...",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "#_kannu...",
      img: "https://randomuser.me/api/portraits/women/66.jpg",
    },
    {
      name: "SALLU K...",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "kajal",
      img: "https://randomuser.me/api/portraits/women/67.jpg",
    },
  ];

  return (
    <>
    <div className="chat-bg">

      {/* HEADER */}
      <div className="chat-header d-flex align-items-center justify-content-between px-3">
        <div>
          <h4 className="fw-bold mb-0">Chats</h4>
          <div className="underline"></div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="search-pill">
            <FaSearch /> <span>Search</span>
          </div>
          <FaUserPlus size={20} />
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="d-flex overflow-auto px-3 gap-3 mt-3 hide-scroll">

        <div className="top-card orange">
          <img src="https://img.icons8.com/3d-fluency/94/microphone.png" />
          <p>Voice Party</p>
        </div>

        <div className="top-card purple">
          <img src="https://img.icons8.com/3d-fluency/94/controller.png" />
          <p>Game</p>
        </div>

        <div className="top-card bordered">
          <div className="badge">27</div>
          <div className="inner-box">
            <FaUsers size={20} />
          </div>
          <p>Followers</p>
        </div>

        <div className="top-card bordered">
          <div className="badge">89</div>
          <div className="inner-box">
            <FaEye size={20} />
          </div>
          <p>Visitors</p>
        </div>

      </div>

      {/* RECOMMENDED */}
      <div className="px-3 mt-4">
        <h5 className="fw-bold">Recommend user in the room</h5>

        <div className="d-flex gap-4 mt-3 overflow-auto hide-scroll">
          {users.map((u, i) => (
            <div key={i} className="text-center">
              <div className="gradient-ring">
                <img src={u.img} alt="" />
              </div>
              <small>{u.name}</small>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT HEADER */}
      <div className="px-3 mt-4 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold">Chatlist</h5>
        <div className="d-flex align-items-center gap-2 text-purple">
          <FaLayerGroup />
          <span>All</span>
          <FaBars className="text-muted ms-2" />
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="px-3 mt-2">
        {chats.map((c, i) => (
          <div
            key={i}
            className="chat-item d-flex align-items-center"
            onClick={() => navigate("/chat-details", { state: c })}
          >

            <img src={c.img} className="chat-img" alt="" />

            <div className="flex-grow-1 ms-3">
              <h6 className="mb-1 fw-bold">{c.name}</h6>
              <small className="text-muted">{c.msg}</small>
            </div>

            <div className="text-end">
              <small className="text-muted">{c.time}</small>
              {c.count > 0 && (
                <div className="chat-badge">{c.count}</div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
      {/* BOTTOM NAV */}
            <div className="bottom-nav">
              <div className="nav-item " onClick={() => navigate("/home")}><HomeIcon size={24} /><div>Home</div></div>
              <div className="nav-item " onClick={() => navigate("/party")}><Mic size={24} /><div>Party</div></div>
              <div className="nav-item active" onClick={() => navigate("/chat")}><MessageCircle size={24} /><div>Chat <span className="dot" /></div></div>
              <div className="nav-item" onClick={() => navigate("/profile")}><User size={24} /><div>Mine</div></div>
            </div>
      
            </>
  );}