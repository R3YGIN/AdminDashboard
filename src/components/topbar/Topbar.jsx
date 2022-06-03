import React from "react";
import "./topbar.css";
import { Language, NotificationsNone, Settings } from "@mui/icons-material";
import { logoutFunc } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    await logoutFunc(dispatch);
    await window.location.reload();
  };
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN</span>
        </div>
        <div className="topRight">
          <div className="topbarUser">{user.username}</div>
          <div className="topbarIconContainer">
            <button className="logoutBtn" onClick={handleClick}>
              Logout
            </button>
          </div>
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img
            className="topAvatar"
            src="http://unsplash.it/40/40"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
}
