"use client";
import React, { useState } from "react";
import { logOut } from "../lib/actions.js";

function LogoutLink() {
  const [state, setState] = useState({ error: null });

  const handleLogout = async (e) => {
    e.preventDefault();
    const newState = await logOut(state);
    setState(newState);
    // await new Promise((resolve) => setTimeout(resolve, 400));
    // window.location.reload();
  };

  return (
    <li className="nav-item">
      <button className="text-center nav-link px-3 py-2" onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0 }}>
        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
          <i className="ni ni-collection text-info text-sm opacity-10"></i>
        </div>
        <span className="nav-link-text ms-1 ">Logout</span>
      </button>
    </li>
  );
}

export default LogoutLink;
