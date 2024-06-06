"use client";

import React, { useState } from "react";
import Link from "next/link";
import './globals.css';

export default function Login() {
  // create useState for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
              <div className="container-fluid ms-0 ps-0 justify-between">
                <a
                  className="navbar-brand font-weight-bolder ms-lg-0 ms-0 ps-0 "
                  href={"/dashboard"}
                >
                  <span className="d-none d-sm-inline">
                    Helpdesk Ticket Management System
                  </span>
                  <span className="d-inline d-sm-none">HTMS</span>
                </a>
                <button
                  className="navbar-toggler shadow-none ms-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    {/* TODO: Add navs here */}
                  </ul>
                  <ul className="navbar-nav d-lg-block d-none">
                    <li className="nav-item w-24">
                      <Link
                        href={"/tickets"}
                        className="btn btn-sm mb-0 me-1 bg-gradient-primary"
                      >
                        {/* <i className="fa fa-search"></i> */}
                        Create Ticket
                      </Link>
                      <Link
                        href={"/login"}
                        className="btn btn-sm mb-0 me-1 btn-primary "
                        style={{ marginLeft: "10px" }}
                      >
                        {/* <i className="fa fa-search"></i> */}
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* <!-- End Navbar --> */}
          </div>
        </div>
      </div>
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container"></div>
          </div>
        </section>
      </main>
    </>
  );
}
