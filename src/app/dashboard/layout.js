import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Footer from "./Footer";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import ThemeButton from "./ThemeButton";
import { UserHeaderName, UserHeaderPath } from "./components/UserHeader";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const styleclass = "";
export const metadata = {
  title: "HTMS | Dashboard Page",
  description: "Created by Newaz Ben Alam",
};

export default function RootLayout({ children }) {
  return (
    <>

      <Script src="https://kit.fontawesome.com/42d5adcbca.js"></Script>
      <Script src="https://kit.fontawesome.com/42d5adcbca.js"></Script>

      <body className="g-sidenav-show   bg-gray-100 .main-content">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <NavBar />
        <main className="main-content position-relative border-radius-lg  ">
          {/* <!-- Navbar --> */}
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
            id="navbarBlur"
            data-scroll="false"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                  <li className="breadcrumb-item text-sm">
                    <Link className="opacity-5 text-white" href="#">
                      Pages
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item text-sm text-white active"
                    aria-current="page"
                  >
                    <UserHeaderPath />
                  </li>
                </ol>
                <h6 className="font-weight-bolder text-white mb-0">
                  <UserHeaderPath />
                </h6>
              </nav>
              <div
                className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
              >
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <div className="input-group">
                    <span className="input-group-text text-">
                      <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type here..."
                    />
                  </div>
                </div>
                <ul className="navbar-nav  justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                    <Link
                      href="#"
                      className="nav-link text-white font-weight-bold px-0"
                    >
                      <i className="fa fa-user me-sm-1"></i>
                      <span className="d-sm-inline d-none">
                        <UserHeaderName />
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <Link
                      href="#"
                      className="nav-link text-white p-0"
                      id="iconNavbarSidenav"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line bg-white"></i>
                        <i className="sidenav-toggler-line bg-white"></i>
                        <i className="sidenav-toggler-line bg-white"></i>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item px-3 d-flex align-items-center">
                    <div className="nav-link text-white p-0">
                      <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </nav>
          {/* <!-- End Navbar --> */}
          <div className="container-fluid py-4 main-container">{children}</div>
          {/* set footer always bottom of the screen or at the last of the long page */}
          <Footer />
        </main>
        <div className="fixed-plugin">

          <div className="card shadow-lg">
            <div className="card-header pb-0 pt-3 ">
              <div className="float-start">
                <h5 className="mt-3 mb-0">HTMS Configurator</h5>
              </div>
              <div className="float-end mt-4">
                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                  <i className="fa fa-close"></i>
                </button>
              </div>
              {/* <!-- End Toggle Button --> */}
            </div>
            <hr className="horizontal dark my-1" />
            <div className="card- pt-sm-3 pt-0 overflow-auto">
              {/* <!-- Sidebar Backgrounds --> */}

              
              {/* <!-- Sidenav Type --> */}
              <div className="mt-3 ml-3">
                <h6 className="mb-0 ">Light / Dark</h6>
                <p className="text-sm">
                  Choose theme types.
                </p>
              </div>
              <div className="d-flex ml-3">

                <ThemeButton title="White" data="bg-white" />
                <ThemeButton title="Dark" data="bg-default" />
              </div>

              {/* <!-- Navbar Fixed --> */}
              
              <hr className="horizontal dark my-sm-4" />
            </div>
          </div>
        </div>
        {/* <SideNavScrollBar /> */}
        <Script src="/assets/js/core/popper.min.js"></Script>
        <Script src="/assets/js/core/bootstrap.min.js"></Script>
        <Script src="/assets/js/plugins/perfect-scrollbar.min.js"></Script>
        <Script src="/assets/js/plugins/smooth-scrollbar.min.js"></Script>
        {/* <Script src="/assets/js/plugins/chartjs.min.js"></Script> */}
        {/* <ChartScript /> */}
        {/* <SideNavScrollBar /> */}
        <Script async defer src="https://buttons.github.io/buttons.js"></Script>
        <Script src="/assets/js/argon-dashboard.js?v=2.0.4"></Script>
      </body>
    </>
  );
}
