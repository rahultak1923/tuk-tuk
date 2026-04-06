import { useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URLS } from "../constants/apiConstants";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ useCallback mein wrap karo
  const fetchUserProfile = useCallback(async (accessToken, userId) => {
    try {
      const response = await fetch(
        `${API_URLS.PROFILE_INFO}?userId=${userId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.json();
      if (data.status === true) {
        localStorage.setItem("image", data.data.picture || "");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      navigate("/profile");
    }
  }, [navigate]);  // ✅ navigate dependency

  useEffect(() => {
    const success = searchParams.get("success");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const fullName = searchParams.get("fullName");

    if (success === "true" && accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("fullName", fullName);

      fetchUserProfile(accessToken, userId);
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams, fetchUserProfile]); // ✅ fetchUserProfile add kiya

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      color: "white",
      background: "#000"
    }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default OAuthCallback;