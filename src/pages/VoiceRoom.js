import React, { useState } from "react";
import "./VoiceRoom.css";
import { useNavigate } from "react-router-dom";
import { 
  Mic, Lock, Settings, Share2, Power, 
  Volume2, Smile, Mail, Gift, Send, MessageCircle 
} from "lucide-react";

export default function VoiceRoom() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to Yari! Please respect each other and talk politely. Abusing, third-party advertising, fake official information are strictly prohibited.", color: "#4ade80" },
    { user: "User123", text: "mom love you 😍💖💝⚡", color: "#fff" }
  ]);
  const [input, setInput] = useState("");

  const seats = [
    { id: "No.1", status: "mic" }, { id: "No.2", status: "mic" },
    { id: "No.3", status: "lock" }, { id: "No.4", status: "lock" },
    { id: "No.5", status: "mic" }, { id: "No.6", status: "lock" },
    { id: "No.7", status: "lock" }, { id: "No.8", status: "mic" },
  ];

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { user: "You", text: input, color: "#fff" }]);
      setInput("");
    }
  };

  return (
    <div className="room-container">
      {/* HEADER */}
      <div className="room-header">
        <div className="admin-info">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="admin" className="admin-dp" />
          <div className="admin-meta">
            <h6>hello 👋😊 w c</h6>
            <span>ID:10039414  👤 0</span>
          </div>
        </div>
        <div className="header-actions">
          <Settings size={20} />
          <Share2 size={20} />
          <Power size={20} onClick={() => navigate(-1)} className="exit-icon" />
        </div>
      </div>

      <div className="trophy-row">🏆 0</div>

      {/* HOST SECTION (Cleaned Error) */}
      <div className="host-section">
        <div className="host-box">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" alt="host" className="host-img" />
          <div className="host-label">🏠 °シ TOXIC GIRL シ°...</div>
        </div>
        {/* Coin Jar moved to separate fixed place to avoid layout errors */}
        
      </div>

      {/* SEATS GRID (Original Grid) */}
      <div className="seats-container">
        {seats.map((seat, index) => (
          <div key={index} className="seat-box">
            <div className="seat-icon-bg">
              {seat.status === "mic" ? <Mic size={20} color="#bbb" /> : <Lock size={20} color="#bbb" />}
            </div>
            <span className="seat-no">{seat.id}</span>
          </div>
        ))}
      </div>

      {/* CHAT MESSAGES */}
      <div className="live-chat-area">
        {messages.map((msg, i) => (
          <div key={i} className="chat-line" style={{ color: msg.color }}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
        <div className="ann-tag">Announcement: 📝</div>
      </div>

      {/* FOOTER (Send Button Always Visible) */}
      <div className="room-bottom-bar">
        <div className="bottom-left">
          <Volume2 size={22} color="white" />
          <div className="circle-mic"><Mic size={20} /></div>
        </div>

        <div className="bottom-input-section">
          <div className="input-field-box">
            <input 
              type="text" 
              placeholder="Say something..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Smile size={18} color="#ccc" />
          </div>
          <button className="always-visible-send" onClick={handleSend}>
            <Send size={16} />
          </button>
        </div>

        <div className="bottom-right">
          <Mail size={22} color="white" />
          <div className="gift-btn"><Gift size={22} color="white" /></div>
        </div>
      </div>
    </div>
  );
}