"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getCookies } from "@/app/lib/actions";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export function UserHeaderName() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await getCookies();
      setSession(sessionData);
    };
    fetchUser();
  }, []);

  return (
    <>
      {" "}
      {session?.user?.name}
      <i className="bg-gradient-warning pr-2 pl-1 py-1 text-xs border-radius-xl ml-1 text-center">
      {!session?.user?.role && <div className="pl-1 d-inline-block">
        <LoadingSpinner/>
      </div>} {session?.user?.role}</i>
    </>
  );
}

export function UserHeaderPath() {
  const currentPath = usePathname();
  const formattedPath = formatPath(currentPath);

  return <>{formattedPath}</>;
}

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatPath(path) {
  if (!path) return "";
  return path
    .split("/")
    .filter((segment) => segment) // Filter out empty segments
    .map((segment) => capitalizeFirstLetter(segment))
    .join(" / ");
}
