"use client";

import React from 'react'
import { useState, useEffect } from "react";
import { getCookies } from "@/app/lib/actions";
import { usePathname } from 'next/navigation'

export function UserHeaderName() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await getCookies();
      setSession(sessionData);
    }
    fetchUser();
  }, []);

  return (
    <> {session?.user?.name}</>
  )
}

export function UserHeaderPath() { 
  const currentPath = usePathname();
  const formattedPath = formatPath(currentPath);

  return (
    <>{formattedPath}</>
  );
}

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatPath(path) {
  if (!path) return '';
  return path
    .split('/')
    .filter(segment => segment) // Filter out empty segments
    .map(segment => capitalizeFirstLetter(segment))
    .join(' / ');
}