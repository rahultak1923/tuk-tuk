import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Home as HomeIcon, MessageCircle, User, Mic, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./party.css";
import { API_URLS } from "../constants/apiConstants";

const banners = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
];

export default function PartyScreen() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState("Recommend");
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Room form state — API request body ke according
  const [roomForm, setRoomForm] = useState({
    roomName: "",
    description: "",
    roomType: "PUBLIC",
    category: "GENERAL",
    maxParticipants: 10,
    roomPassword: "",
    backgroundMusic: "",
    roomImage: "",
    roomLanguage: "Hindi",
    tags: "",
    minAge: 18,
    maxAge: 99,
    welcomeMessage: "",
    autoCloseAfterHours: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleFormChange = (e) => {
    setRoomForm({ ...roomForm, [e.target.name]: e.target.value });
  };

  // ✅ Create Room API call
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomForm.roomName.trim()) return;

    setCreateLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const requestBody = {
        hostId: Number(userId),
        roomName: roomForm.roomName,
        description: roomForm.description,
        roomType: roomForm.roomType,
        category: roomForm.category,
        maxParticipants: Number(roomForm.maxParticipants),
        roomPassword: roomForm.roomPassword,
        backgroundMusic: roomForm.backgroundMusic,
        roomImage: roomForm.roomImage,
        roomLanguage: roomForm.roomLanguage,
        tags: roomForm.tags,
        minAge: Number(roomForm.minAge),
        maxAge: Number(roomForm.maxAge),
        welcomeMessage: roomForm.welcomeMessage,
        autoCloseAfterHours: Number(roomForm.autoCloseAfterHours),
      };

      const response = await fetch(API_URLS.CREATE_ROOM, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.status === true) {
        setShowCreatePopup(false);
        // ✅ Room data ke saath navigate karo
        navigate("/room", { state: { roomData: data.data } });
      } else {
        setError(data.message || "Room create karne mein error aayi.");
      }
    } catch (err) {
      console.error("Create room error:", err);
      setError("Network error. Please try again.");
    } finally {
      setCreateLoading(false);
    }
  };

  const allRooms = {
    Recommend: [
      { name: "yadav ka room 💗 k dosto ka r...", users: 5, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200", level: "⭐" },
      { name: "BBYFCK 🍼🔥 YOU", users: 4, img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200", level: "🛡️" },
    ],
    New: [
      { name: "Fresh Party Zone ✨", users: 2, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200", level: "🆕" },
      { name: "New Friends Only", users: 8, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200", level: "⭐" },
    ],
    Game: [
      { name: "Ludo King 🎲", users: 12, img: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=200", level: "🎮" },
      { name: "PUBG Voice Chat", users: 24, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200", level: "🔥" },
    ],
    "Blind date": [
      { name: "Secret Match ❤️", users: 2, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200", level: "💘" },
      { name: "Blind Date Night", users: 6, img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=200", level: "🌹" },
    ],
  };

  return (
    <div className="party-container">

      {/* ✅ CREATE ROOM POPUP */}
      {showCreatePopup && (
        <div className="p-popup-overlay">
          <div className="p-create-card-advanced">
            <div className="p-popup-header">
              <h5>Create Voice Room</h5>
              <X className="p-close" onClick={() => setShowCreatePopup(false)} />
            </div>

            <form onSubmit={handleCreateRoom} className="p-scrollable-form">

              {/* ROOM IMAGE */}
              <div className="p-input-group text-center">
                <label>Room Cover Image</label>
                <div className="p-image-upload-box">
                  <input type="file" id="roomImg" accept="image/*" className="d-none" />
                  <label htmlFor="roomImg" className="p-upload-label">
                    <FaPlus size={20} />
                    <span>Upload Cover</span>
                  </label>
                </div>
              </div>

              {/* ROOM NAME */}
              <div className="p-input-group">
                <label>Room Name *</label>
                <input
                  type="text"
                  name="roomName"
                  placeholder="Room name..."
                  value={roomForm.roomName}
                  onChange={handleFormChange}
                  autoFocus
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="p-input-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="What's this room about?"
                  rows="2"
                  className="p-textarea"
                  value={roomForm.description}
                  onChange={handleFormChange}
                />
              </div>

              {/* ROOM TYPE */}
              <div className="p-input-group">
                <label>Room Type</label>
                <select name="roomType" value={roomForm.roomType} onChange={handleFormChange}>
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </select>
              </div>

              {/* CATEGORY */}
              <div className="p-input-group">
                <label>Category</label>
                <select name="category" value={roomForm.category} onChange={handleFormChange}>
                  <option value="GENERAL">General</option>
                  <option value="GAME">Game</option>
                  <option value="BLIND_DATE">Blind Date</option>
                  <option value="MUSIC">Music</option>
                </select>
              </div>

              {/* MAX PARTICIPANTS */}
              <div className="p-row-inputs">
                <div className="p-input-group flex-1">
                  <label>Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    placeholder="e.g. 100"
                    min="1"
                    value={roomForm.maxParticipants}
                    onChange={handleFormChange}
                  />
                </div>

                {/* AUTO CLOSE */}
                <div className="p-input-group flex-1">
                  <label>Auto Close (hrs)</label>
                  <input
                    type="number"
                    name="autoCloseAfterHours"
                    placeholder="e.g. 2"
                    min="1"
                    value={roomForm.autoCloseAfterHours}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              {/* WELCOME MESSAGE */}
              <div className="p-input-group">
                <label>Welcome Message</label>
                <input
                  type="text"
                  name="welcomeMessage"
                  placeholder="Welcome to my room!"
                  value={roomForm.welcomeMessage}
                  onChange={handleFormChange}
                />
              </div>

              {/* LANGUAGE */}
              <div className="p-input-group">
                <label>Room Language</label>
                <select name="roomLanguage" value={roomForm.roomLanguage} onChange={handleFormChange}>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>

              {/* TAGS */}
              <div className="p-input-group">
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="e.g. music, fun, gaming"
                  value={roomForm.tags}
                  onChange={handleFormChange}
                />
              </div>

              {/* ERROR */}
              {error && (
                <div style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}>
                  {error}
                </div>
              )}

              <button type="submit" className="p-create-btn" disabled={createLoading}>
                {createLoading ? "Creating..." : "Create & Join Room"}
              </button>

            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="party-header">
        <div className="header-tabs">
          <span className="active-tab">Party</span>
        </div>
        <div className="header-icons">
          <FaPlus className="top-icon" onClick={() => setShowCreatePopup(true)} style={{ cursor: "pointer" }} />
          <FaSearch className="top-icon" />
        </div>
      </div>

      {/* BANNER */}
      <div className="banner-section">
        <div className="single-banner">
          <img src={banners[current]} alt="banner" />
        </div>
        <div className="banner-dots">
          {banners.map((_, i) => (
            <span key={i} className={i === current ? "p-dot active" : "p-dot"} />
          ))}
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className="party-cat-grid">
        <div className="p-cat-card"><div className="p-cat-icon">👑</div><p>Ranking</p></div>
        <div className="p-cat-card"><div className="p-cat-icon">🎮</div><p>Game</p></div>
        <div className="p-cat-card"><div className="p-cat-icon">🏰</div><p>Family</p></div>
      </div>

      {/* CHIPS */}
      <div className="p-chips-container">
        {Object.keys(allRooms).map((c) => (
          <span key={c} onClick={() => setCategory(c)} className={category === c ? "p-chip p-active" : "p-chip"}>
            {c}
          </span>
        ))}
      </div>

      {/* ROOM LIST */}
      <div className="p-room-list">
        {allRooms[category].map((r, i) => (
          <div key={i} className="p-room-card" onClick={() => navigate("/room")}>
            <div className="p-room-avatar"><img src={r.img} alt="" /></div>
            <div className="p-room-info">
              <div className="p-room-name">{r.name}</div>
              <div className="p-room-meta">{r.level} <span>📊 {r.users}</span></div>
            </div>
            <div className="p-room-action"><MessageCircle size={18} color="#aaa" /></div>
          </div>
        ))}
      </div>

      {/* RECOMMEND USERS */}
      <div className="p-rec-users">
        <p className="p-section-title">Recommend user in the room</p>
        <div className="p-users-scroll">
          {[
            { name: "Riya ji", img: "https://i.pravatar.cc/150?u=1" },
            { name: "Keerat...", img: "https://i.pravatar.cc/150?u=2" },
            { name: "little girl 💖", img: "https://i.pravatar.cc/150?u=3" },
            { name: "Suzi 👑", img: "https://i.pravatar.cc/150?u=4" },
          ].map((user, i) => (
            <div key={i} className="p-user-item">
              <div className="p-user-dp-wrapper"><img src={user.img} alt={user.name} /></div>
              <span className="p-user-name-fix">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/home")}><HomeIcon size={24} /><div>Home</div></div>
        <div className="nav-item active" onClick={() => navigate("/party")}><Mic size={24} /><div>Party</div></div>
        <div className="nav-item" onClick={() => navigate("/chat")}><MessageCircle size={24} /><div>Chat <span className="dot" /></div></div>
        <div className="nav-item" onClick={() => navigate("/profile")}><User size={24} /><div>Mine</div></div>
      </div>

    </div>
  );
}