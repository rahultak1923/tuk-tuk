import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon, MessageCircle, User, Mic } from "lucide-react";

import { API_URLS } from "../constants/apiConstants";

import { FaHome, FaInstagram, FaShareAlt, FaWallet } from "react-icons/fa";
import {
  MdDiamond, MdMonetizationOn, MdTask, MdStore, MdVerified, MdSupportAgent,
} from "react-icons/md";

export default function ProfilePage() {
  const [tab, setTab] = useState("moment");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "", email: "", userId: "", image: "",
    education: "", occupation: "", gender: "", birthday: "",
    spokenLanguage: "", aboutMe: "", interests: [],
  });

  // ✅ Followers/Following count
  const [stats, setStats] = useState({
    totalFollowers: 0,
    totalFollowing: 0,
  });

  // ✅ Profile API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");

        const response = await fetch(
          `${API_URLS.PROFILE_INFO}?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.status === true) {
          const d = result.data;
          setUser({
            fullName: d.fullName || "",
            email: d.email || "",
            userId: d.userId || "",
            image: d.picture || "",
            education: d.education || "",
            occupation: d.occupation || "",
            gender: d.gender || "",
            birthday: d.birthday || "",
            spokenLanguage: d.spokenLanguage || "",
            aboutMe: d.aboutMe || "",
            interests: d.interests || [],
          });
          localStorage.setItem("fullName", d.fullName || "");
          localStorage.setItem("image", d.picture || "");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser({
          fullName: localStorage.getItem("fullName") || "User",
          email: localStorage.getItem("email") || "",
          userId: localStorage.getItem("userId") || "",
          image: localStorage.getItem("image") || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Followers + Following count API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");

        // Dono APIs parallel mein call karo
        const [followersRes, followingRes] = await Promise.all([
          fetch(`${API_URLS.FOLLOWERS}?targetUserId=${userId}&page=0&size=1`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${API_URLS.FOLLOWING}?targetUserId=${userId}&page=0&size=1`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        const followersData = await followersRes.json();
        const followingData = await followingRes.json();

        setStats({
          // ✅ stats object se count lo
          totalFollowers: followersData?.data?.stats?.totalFollowers || 0,
          totalFollowing: followingData?.data?.stats?.totalFollowing || 0,
        });

      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };

    fetchStats();
  }, []);

  const menuPages = [
    [
      { name: "Level", icon: <MdVerified /> },
      { name: "Instagram", icon: <FaInstagram /> },
      { name: "Share", icon: <FaShareAlt /> },
      { name: "Help", icon: <MdSupportAgent /> },
      { name: "Badge", icon: <MdVerified /> },
      { name: "Store", icon: <MdStore /> },
      { name: "Task", icon: <MdTask /> },
      { name: "Wallet", icon: <FaWallet /> },
    ],
    [
      { name: "VIP", icon: <MdVerified /> },
      { name: "Room", icon: <FaHome /> },
      { name: "Rewards", icon: <MdDiamond /> },
      { name: "Friends", icon: <FaHome /> },
      { name: "More1", icon: <MdStore /> },
      { name: "More2", icon: <MdTask /> },
      { name: "More3", icon: <MdDiamond /> },
      { name: "More4", icon: <FaWallet /> },
    ],
  ];

  const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1544005313-94ddf0286df2";

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#000", color: "#fff" }}>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid profile-bg pb-5">

      {/* TOP BAR */}
      <div className="d-flex justify-content-between p-3">
        <div className="d-flex gap-2">
          <div className="pill"><MdDiamond color="#a855f7" /> 32</div>
          <div className="pill"><MdMonetizationOn color="#f59e0b" /> 0</div>
        </div>
        <MdVerified size={22} />
      </div>

      {/* HEADER BG */}
      <div className="header-bg"></div>

      {/* PROFILE CARD */}
      <div className="card-box header-card">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={user.image || DEFAULT_IMAGE}
              className="dp"
              alt="profile"
              onClick={() => navigate("/edit-profile")}
              style={{ cursor: "pointer" }}
              onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
            />
            <div className="ms-3">
              <h6 className="fw-bold mb-0">{user.fullName}</h6>
              <small>ID: {user.userId}</small>
              {user.gender && <small className="ms-2">{user.gender}</small>}
              <div className="d-flex gap-1 mt-1">
                <span className="badge-box">LV.0</span>
                <span className="badge-box">0</span>
                <span className="badge-box">0</span>
              </div>
            </div>
          </div>
          <div className="text-end">
            <button className="verify-btn">Verify</button>
            <div className="love-zone"><FaHome /> Love Zone</div>
          </div>
        </div>

        {user.aboutMe && (
          <p className="text-muted small mt-2 mb-0">{user.aboutMe}</p>
        )}

        {user.interests.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mt-2">
            {user.interests.map((interest, i) => (
              <span key={i} className="badge-box">{interest}</span>
            ))}
          </div>
        )}
      </div>

      {/* ✅ STATS — Dynamic count */}
      <div className="card-box d-flex justify-content-around text-center">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/following")}>
          <h6>{stats.totalFollowing}</h6>  {/* ✅ Dynamic */}
          <small>Following</small>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/followers")}>
          <h6>{stats.totalFollowers}</h6>  {/* ✅ Dynamic */}
          <small>Followers</small>
        </div>
        <div>
          <h6>37</h6>
          <small>Visitors</small>
        </div>
      </div>

      {/* MENU */}
      <div className="card-box">
        <h6 className="fw-bold mb-3">Menu</h6>
        <div className="menu-scroll">
          <div className="menu-wrapper">
            {menuPages.map((page, pIndex) => (
              <div key={pIndex} className="menu-page">
                <div className="row g-3 mt-1">
                  {page.map((item, i) => (
                    <div key={i} className="col-3 text-center">
                      <div className="menu-icon">{item.icon}</div>
                      <small>{item.name}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="card-box d-flex justify-content-around tabs">
        {["moment", "profile", "honor", "gift"].map((t) => (
          <div key={t} className={tab === t ? "tab active" : "tab"} onClick={() => setTab(t)}>
            {t}
          </div>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="card-box mb-4 pb-4">
        {tab === "moment" && (
          <div className="moment-card">
            <div className="d-flex align-items-center mb-2">
              <img
                src={user.image || DEFAULT_IMAGE}
                className="mini-dp"
                alt=""
                onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
              />
              <b className="ms-2">{user.fullName}</b>
            </div>
            <p>Just setting up my profile 🚀</p>
            <img src="https://img.freepik.com/free-vector/flat-creativity-concept.jpg" className="img-fluid rounded" alt="" />
            <div className="d-flex gap-3 mt-2 text-muted small">❤️ 12 💬 2</div>
          </div>
        )}

        {tab === "profile" && (
          <div className="p-2">
            {user.education && <div className="list-item"><span>Education</span><span>{user.education}</span></div>}
            {user.occupation && <div className="list-item"><span>Occupation</span><span>{user.occupation}</span></div>}
            {user.spokenLanguage && <div className="list-item"><span>Language</span><span>{user.spokenLanguage}</span></div>}
            {user.birthday && <div className="list-item"><span>Birthday</span><span>{user.birthday}</span></div>}
          </div>
        )}
      </div>
{/* BOTTOM NAV */}
            <div className="bottom-nav ">
              <div className="nav-item " onClick={() => navigate("/home")}><HomeIcon size={24} /><div>Home</div></div>
              <div className="nav-item " onClick={() => navigate("/party")}><Mic size={24} /><div>Party</div></div>
              <div className="nav-item " onClick={() => navigate("/chat")}><MessageCircle size={24} /><div>Chat <span className="dot" /></div></div>
              <div className="nav-item active" onClick={() => navigate("/profile")}><User size={24} /><div>Mine</div></div>
            </div>
   
    </div>
  );
}