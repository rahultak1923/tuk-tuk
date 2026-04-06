import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthCallback from "./pages/OAuthCallback";

import Login from "./pages/Login";
import EnterMobile from "./pages/EnterMobile";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import PartyScreen from "./pages/PartyScreen";
import ProfilePage from "./pages/ProfilePage";

import EditProfile from "./pages/EditProfile";
import FollowingPage from "./pages/FollowingPage";
import FollowersPage from "./pages/FollowersPage";
import VoiceRoom from './pages/VoiceRoom';

import Chat from "./pages/ChatPage";
import ChatDetails from "./pages/ChatDetails";
// import Mine from './pages/Mine';
// import Settings from './pages/Settings';
// import MenuPage from './pages/MenuPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<h1>Home Page</h1>} /> */}

          <Route path='/' element={<Login/>}/>
          <Route path='/enter-mobile' element={<EnterMobile/>}/>
          <Route path='/verify-otp' element={<VerifyOtp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/party' element={<PartyScreen/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path="/oauth/callback" element={<OAuthCallback />} />

          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/following' element={<FollowingPage/>}/>
          <Route path='/followers' element={<FollowersPage/>}/>
          <Route path='/room' element={<VoiceRoom/>}/>

           <Route path='/chat' element={<Chat/>}/>
          <Route path='/chat-details' element={<ChatDetails/>}/>

          {/* <Route path='/mine' element={<Mine/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/menu/:name' element={<MenuPage/>}/> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;