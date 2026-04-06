import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [tab, setTab] = useState("Moment");

  const menu = [
    { name: "Get Rewards", icon: "bi-gift" },
    { name: "Task", icon: "bi-calendar-check" },
    { name: "Monthly card", icon: "bi-credit-card" },
    { name: "Store", icon: "bi-shop" },
    { name: "Relationship", icon: "bi-people" },
    { name: "Wallet", icon: "bi-wallet2" },
    { name: "Premium", icon: "bi-patch-check" },
    { name: "VIP", icon: "bi-gem" },
  ];

  if (page === "settings") {
    return (
      <div className="container py-4">
        <h4>Settings</h4>
        <div className="card mt-3">
          <div className="list-group list-group-flush">
            <div className="list-group-item">Account</div>
            <div className="list-group-item">Edit Profile</div>
            <div className="list-group-item text-danger">Logout</div>
          </div>
        </div>
        <button className="btn btn-secondary mt-3" onClick={()=>setPage("home")}>
          Back
        </button>
      </div>
    );
  }

  if (page.startsWith("menu")) {
    return (
      <div className="container py-4">
        <h4>{page.replace("menu-", "")}</h4>
        <p>Content page</p>
        <button className="btn btn-secondary" onClick={()=>setPage("home")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="header">
        <div className="d-flex justify-content-between">
          <div>
            <span className="badge bg-light text-dark me-2">
              <i className="bi bi-gem"></i> 3
            </span>
            <span className="badge bg-light text-dark">
              <i className="bi bi-coin"></i> 10
            </span>
          </div>

          <i
            className="bi bi-gear fs-5"
            onClick={()=>setPage("settings")}
            style={{cursor:"pointer"}}
          ></i>
        </div>

        <div className="text-center mt-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            width="110"
          />
        </div>
      </div>

      <div className="container">

        {/* PROFILE */}
        <div className="profile-card">
          <div className="d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/100"
              className="rounded-circle"
              width="60"
            />

            <div className="ms-3 flex-grow-1">
              <h6 className="fw-bold mb-1">Rahul</h6>
              <small className="text-muted">ID:746783160</small>

              <div className="mt-1">
                <span className="badge-soft me-1">Lv.1</span>
                <span className="badge-soft me-1">0</span>
                <span className="badge-soft">0</span>
              </div>
            </div>

            <div className="text-end">
              <div className="verify-btn mb-2">
                <i className="bi bi-mic"></i> Verify
              </div>
              <small><i className="bi bi-house"></i> Love Zone</small>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="card-box mt-3">
          <div className="row text-center">
            <div className="col">
              <h6>0</h6>
              <small>Following</small>
            </div>
            <div className="col">
              <h6>28</h6>
              <small>Followers</small>
            </div>
            <div className="col">
              <h6>95</h6>
              <small>Visitors</small>
            </div>
          </div>
        </div>

        {/* CLOSE FRIEND */}
        <div className="card-box mt-3">
          <div className="d-flex justify-content-between">
            <strong>Close friend (0/3)</strong>
            <i className="bi bi-chevron-right"></i>
          </div>
          <small className="text-muted">
            No soulmate yet, invite friends
          </small>
        </div>

        {/* MENU */}
        <div className="card-box mt-3">
          <h6 className="fw-bold mb-3">Menu</h6>

          <div className="menu-grid">
            {menu.map((m,i)=>(
              <div
                key={i}
                className="menu-item"
                onClick={()=>setPage(`menu-${m.name}`)}
              >
                <div className="menu-icon">
                  <i className={`bi ${m.icon}`}></i>
                </div>
                <small>{m.name}</small>
              </div>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="card-box mt-3">
          <div className="d-flex">
            {["Moment","Profile","Honor","Gift"].map(t=>(
              <div
                key={t}
                className={tab===t ? "tab active" : "tab"}
                onClick={()=>setTab(t)}
              >
                {t}
              </div>
            ))}
          </div>

          <div className="mt-3">
            {tab==="Moment" && <div>No post yet</div>}
            {tab==="Profile" && <div>Profile Data</div>}
            {tab==="Honor" && <div>Honor Levels</div>}
            {tab==="Gift" && <div>Gift Section</div>}
          </div>
        </div>

      </div>
    </div>
  );
}