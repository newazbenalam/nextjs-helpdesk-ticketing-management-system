"use client";

import React, { useEffect, useRef } from "react";
import sidebarType from "../hooks/SidebarType";

export default function ThemeButton({ data, title }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleClick = () => {
      sidebarType(button); // Call sidebarType with the button element
    };

    if (button) {
      button.addEventListener('click', handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef} // Attach ref to the button element
      className="btn bg-gradient-primary w-100 px-3 mb-2 active me-2"
      data-class={data}
    >
      {title}
    </button>
  );
}
