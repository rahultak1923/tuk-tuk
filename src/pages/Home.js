import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Home as HomeIcon,
  MessageCircle,
  User,
  Mic,
  ChevronRight,
  X,            // Close icon ke liye
  AlertCircle   // Alert icon ke liye
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("For You");
  const [showPopup, setShowPopup] = useState(false); // Popup state

  // Logic: 2 second baad popup show hoga
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPopup(true);
  //   }, 2000);

  //   return () => clearTimeout(timer); 
  // }, []);

  const profiles = [
    { name: "Sanam", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200" },
    { name: "Erat", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
    { name: "Prtiksha", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
    { name: "Rishi", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200" }
  ];

  return (
    <div className="home-container">
      
      {/* --- SUBSCRIPTION POPUP --- */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="subscription-popup">
            {/* Close Button */}
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              <X size={20} color="#666" />
            </button>

            {/* Popup Content */}
            <div className="popup-content">
              <div className="popup-icon-circle">
                <AlertCircle size={40} color="#ff9800" />
              </div>
              <h3>Subscription Alert!</h3>
              <p>
                Your subscription will be <strong>over within 7 days</strong>. 
                Renew now to keep enjoying Tuk Tuk.
              </p>
              <button className="renew-action-btn" onClick={() => navigate("/subscription")}>
                Renew Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <div className="top-navbar">
        <h1 className="logo">Tuk Tuk</h1>
        <div className="notification" onClick={() => navigate("/home")}>
          <Bell size={28} color="white" />
          <span className="badge">7</span>
        </div>
      </div>

      {/* ACTIVE */}
      <div className="active-pill">
        <span className="active-number">270857</span>
        <span> Active Now</span>
      </div>

      {/* LIVE */}
      <div className="live-card">
        <h5 className="live-title">Live Now</h5>
        <div className="live-scroll">
          {profiles.map((p, i) => (
            <div key={i} className="profile">
              <div className="avatar-wrapper">
                <img src={p.img} className="avatar" alt="" />
                <span className="online-dot" />
              </div>
              <span className="profile-name">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 ACTION CARDS */}
      <div className="actions-grid">
        <div className="action-card voice-party-style" onClick={() => navigate("/party")}>
          <h6>VOICE PARTY</h6>
          <div className="arrow-box"><ChevronRight size={14} /></div>
          <div className="card-illustration">🎙️</div>
        </div>

        <div className="action-card glass find-style" onClick={() => navigate("/friends")}>
          <h6>FIND <br /> FRIENDS</h6>
          <div className="arrow-box"><ChevronRight size={14} /></div>
          <div className="card-illustration">👥</div>
        </div>

        <div className="action-card glass nearby-style" onClick={() => navigate("/nearby")}>
          <h6>NEARBY</h6>
          <div className="arrow-box"><ChevronRight size={14} /></div>
          <div className="card-illustration">📍</div>
        </div>

        <div className="action-card glass speed-style" onClick={() => navigate("/matching")}>
          <h6>SPEED <br /> MATCHING</h6>
          <div className="arrow-box"><ChevronRight size={14} /></div>
          <div className="card-illustration">💕</div>
        </div>
      </div>

      {/* ROUND ICON SECTION */}
      <div className="icon-row">
        <div className="icon-item"><div className="circle">📞</div><p>Voice Call</p></div>
        <div className="icon-item"><div className="circle">✉️</div><p>Blind Pick</p></div>
        <div className="icon-item"><div className="circle">🍾</div><p>Truth & Dare</p></div>
        <div className="icon-item"><div className="circle gold">🎁</div><p>Invitation Rewards</p></div>
      </div>

      {/* TABS SECTION */}
      <div className="tabs">
        {["For You", "Selfie", "Online", "Following", "New"].map((tab) => (
          <div
            key={tab}
            className={`tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
            {selectedTab === tab && <div className="underline" />}
          </div>
        ))}
      </div>

      {/* POST CARD */}
      {selectedTab === "For You" && (
        <div className="live-card">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img src="https://randomuser.me/api/portraits/men/1.jpg" style={{ width: 40, height: 40, borderRadius: "50%" }} alt="" />
            <b>Dev</b>
          </div>
          <p style={{ marginTop: "10px" }}>first post of the day</p>
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px", marginTop: "10px" }} alt="" />
          <div style={{ marginTop: "10px", display: "flex", gap: "15px" }}><span>❤️ 0</span><span>💬 0</span></div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div className="nav-item active" onClick={() => navigate("/home")}><HomeIcon size={22} /><div>Home</div></div>
        <div className="nav-item" onClick={() => navigate("/party")}><Mic size={22} /><div>Party</div></div>
        <div className="nav-item" onClick={() => navigate("/chat")}><MessageCircle size={22} /><div>Chat <span className="dot" /></div></div>
        <div className="nav-item" onClick={() => navigate("/profile")}><User size={22} /><div>Mine</div></div>
      </div>
    </div>
  );
}

export default Home;