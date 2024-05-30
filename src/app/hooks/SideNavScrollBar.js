"use client";
import { useEffect } from "react";

const SideNavScrollBar = () => {
  useEffect(() => {
    const loadSideNavScrollBar = () => {
      var win = navigator.platform.indexOf('Win') > -1;
      if (win && document.querySelector('#sidenav-scrollbar')) {
        var options = {
          damping: '0.5'
        }
        Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
      }
    };
    loadSideNavScrollBar();
  }, []); // useEffect
};

export default SideNavScrollBar;