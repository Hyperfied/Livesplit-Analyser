import "./NavBar.css";
import React from "react";

function NavBar() {
  return (
    <div className="nav-bar" onClick={() => window.location.reload()}>
      <div className="nav-bar-block">
        <h1>Split Stats</h1>
      </div>
    </div>
  );
}

export default NavBar;
