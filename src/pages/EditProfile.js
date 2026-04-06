import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./editProfile.css";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../constants/apiConstants";

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    avatar: "",
    gender: "",
    nickname: "",
    birthday: "",
    interests: [],
    education: "",
    school: "",
    occupation: "",
    spokenLanguage: "",
    aboutMe: "",
    sportsInto: "",
    musicLike: "",
    favoriteFood: "",
    favoriteMoviesTv: "",
    booksPrefer: "",
    traveled: ""
  });

  // ✅ Page open hone pe profile fetch karo
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
          // ✅ Response data → formData mein set karo
          setFormData({
            avatar: d.picture || localStorage.getItem("image") || "",
            gender: d.gender || "",
            nickname: d.fullName || "",
            birthday: d.birthday || "",
            interests: d.interests || [],
            education: d.education || "",
            school: d.school || "",
            occupation: d.occupation || "",
            spokenLanguage: d.spokenLanguage || "",
            aboutMe: d.aboutMe || "",
            sportsInto: d.sportsInto || "",
            musicLike: d.musicLike || "",
            favoriteFood: d.favoriteFood || "",
            favoriteMoviesTv: d.favoriteMoviesTv || "",
            booksPrefer: d.booksPrefer || "",
            traveled: d.traveled || "",
          });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  // ✅ Image change handler — blob ki jagah base64
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result = "data:image/jpeg;base64,/9j/4AAQ..."
      setFormData({ ...formData, avatar: reader.result });
    };
    reader.readAsDataURL(file); // ✅ Base64 convert
  }
};

  const handleInterestsChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      interests: value.split(",").map((item) => item.trim()),
    });
  };

  // ✅ Save karo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const requestBody = {
        userId: Number(userId),
        fullName: formData.nickname,
        picture: formData.avatar,
        email: localStorage.getItem("email"),
        education: formData.education,
        school: formData.school,
        occupation: formData.occupation,
        spokenLanguage: formData.spokenLanguage,
        aboutMe: formData.aboutMe,
        gender: formData.gender,
        birthday: formData.birthday,
        interests: formData.interests,
        sportsInto: formData.sportsInto,
        musicLike: formData.musicLike,
        favoriteFood: formData.favoriteFood,
        favoriteMoviesTv: formData.favoriteMoviesTv,
        booksPrefer: formData.booksPrefer,
        traveled: formData.traveled,
      };

      const response = await fetch(API_URLS.EDIT_PROFILE, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.status === true) {
        localStorage.setItem("fullName", formData.nickname);
        localStorage.setItem("image", formData.avatar);
        alert(data.message || "Profile Updated!");
        navigate(-1);
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Data load hone tak loading show karo
  if (fetchLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#000", color: "#fff" }}>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid edit-bg">

      {/* HEADER */}
      <div className="d-flex align-items-center p-3">
        <FaArrowLeft size={18} style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
        <h5 className="mx-auto fw-bold">Account</h5>
      </div>

      <form onSubmit={handleSubmit}>

        {/* PROFILE IMAGE */}
        <div className="text-center mt-3">
          <div className="progress-circle" style={{ cursor: "pointer" }} onClick={handleImageClick}>
            <img src={formData.avatar} className="edit-dp" alt=""
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2"; }}
            />
          </div>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
          <h5 className="mt-3 text-purple">53% complete</h5>
          <p className="text-muted small px-4">Complete your account info to attract more like-minded mates</p>
        </div>

        {/* ERROR */}
        {error && <div className="alert alert-danger mx-3">{error}</div>}

        {/* PERSONAL INFO */}
        <div className="mt-4">
          <h6 className="text-muted mb-3">Personal info</h6>

          <div className="list-item">Avatar <span>Editable</span></div>

          <div className="list-item">
            <span>Gender</span>
            <select name="gender" value={formData.gender} onChange={handleChange} className="border-0 text-end">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="list-item">
            <span>Nickname</span>
            <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Birthday</span>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Interests</span>
            <input type="text" value={formData.interests.join(", ")} onChange={handleInterestsChange} placeholder="e.g. Music, Travel" className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Education</span>
            <input type="text" name="education" value={formData.education} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>School</span>
            <div className="d-flex align-items-center gap-2">
              <input type="text" name="school" value={formData.school} onChange={handleChange} placeholder="Add school" className="border-0 text-end" />
              <button type="button" className="add-btn"><FaPlus /></button>
            </div>
          </div>

          <div className="list-item">
            <span>Occupation</span>
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Spoken Language</span>
            <input type="text" name="spokenLanguage" value={formData.spokenLanguage} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>About Me</span>
            <input type="text" name="aboutMe" value={formData.aboutMe} onChange={handleChange} className="border-0 text-end" />
          </div>

          {/* MORE INFO */}
          <h6 className="text-muted mb-3 mt-4">More info</h6>

          <div className="list-item">
            <span>Sports</span>
            <input type="text" name="sportsInto" value={formData.sportsInto} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Music</span>
            <input type="text" name="musicLike" value={formData.musicLike} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Favorite Food</span>
            <input type="text" name="favoriteFood" value={formData.favoriteFood} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Movies / TV</span>
            <input type="text" name="favoriteMoviesTv" value={formData.favoriteMoviesTv} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Books</span>
            <input type="text" name="booksPrefer" value={formData.booksPrefer} onChange={handleChange} className="border-0 text-end" />
          </div>

          <div className="list-item">
            <span>Traveled</span>
            <input type="text" name="traveled" value={formData.traveled} onChange={handleChange} className="border-0 text-end" />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4 mb-5" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>

        </div>
      </form>
    </div>
  );
}