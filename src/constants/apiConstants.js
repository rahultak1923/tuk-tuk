// src/constants/apiConstants.js

// const BASE_URL = "http://localhost:8083";
const BASE_URL = "https://tuk-tuk-backend-wvi2.onrender.com";

export const API_URLS = {
    GOOGLE_LOGIN: `${BASE_URL}/oauth2/authorization/google`,
    REFRESH_TOKEN: `${BASE_URL}/api/v1/auth/refresh`,
    VALIDATE_TOKEN: `${BASE_URL}/api/v1/auth/validate`,
    ME: `${BASE_URL}/api/v1/auth/me`,
    EDIT_PROFILE: `${BASE_URL}/api/v1/user-profile/edit-user`,  // ✅
    PROFILE_INFO:  `${BASE_URL}/api/v1/user-profile/profile-info-by-id`,  // ✅ add karo
    FOLLOWERS:     `${BASE_URL}/api/v1/social/follow/followers`,   // ✅
    FOLLOWING:     `${BASE_URL}/api/v1/social/follow/following`,   // ✅
    CREATE_ROOM: `${BASE_URL}/api/v1/voice-chat/rooms/create-room`,  // ✅
    ROOM_LIST:   `${BASE_URL}/api/v1/voice-chat/rooms/lis`,   // ✅
};

export default BASE_URL;