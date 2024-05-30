import React, { useState } from "react";
import { logOut } from "../lib/actions";


export default function LogOutButton() {
  
  const [state, setState] = useState({ error: null });

  const handleLogout = async () => {
    const newState = await logOut(state);
    setState(newState);
  };

  return (
    <button onClick={handleLogout}>Log out</button>

  )
}
