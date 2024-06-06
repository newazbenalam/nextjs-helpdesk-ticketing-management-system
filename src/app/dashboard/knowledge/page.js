"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Login() {
  // create useState for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <main className="main-content  mt-0 min-vh-100" >
        <section>
          {/* <div className="page-header min-vh-100"> */}
            <div className=" container-fluid bg-white border-radius-xl shadow-sm py-3">
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
              <h2> Knowledge Base Page</h2>
            </div>
          {/* </div> */}
        </section>
      </main>
    </>
  );
}
