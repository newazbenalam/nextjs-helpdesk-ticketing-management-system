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
      <Head>
        <Link rel="stylesheet" href="/assets/css/nucleo-icons.css" />
        <Link rel="stylesheet" href="/assets/css/nucleo-svg.css" />
        <Link rel="stylesheet" href="/assets/css/argon-dashboard.css?v=2.0.4" />
      </Head>
      <Script src="https://kit.fontawesome.com/42d5adcbca.js"></Script>
      {/* <Script src="/assets/js/scripts.js"></Script> */}

      <body className="g-sidenav-show   bg-gray-100 .main-content">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <NavBar />
        <main className="main-content position-relative border-radius-lg ">
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
                  <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <Link
                      href="#"
                      className="nav-link text-white p-0"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-bell cursor-pointer"></i>
                    </Link>
                    <ul
                      className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="mb-2">
                        <Link
                          className="dropdown-item border-radius-md"
                          href="#"
                        >
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              <Image
                                src="/assets/img/team-2.jpg"
                                alt=""
                                className=" h-auto w-auto avatar avatar-sm  me-3 "
                                width={0}
                                height={0}
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">
                                  New message
                                </span>{" "}
                                from Laur
                              </h6>
                              <p className="text-xs text-secondary mb-0 text-black">
                                <i className="fa fa-clock me-1"></i>
                                13 minutes ago
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          className="dropdown-item border-radius-md"
                          href="#"
                        >
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              <Image
                                src="/assets/img/small-logos/logo-spotify.svg"
                                className="avatar avatar-sm bg-gradient-dark me-3 h-auto w-auto"
                                alt=""
                                width={0}
                                height={0}
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">
                                  New album
                                </span>{" "}
                                by Travis Scott
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>1 day
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item border-radius-md"
                          href="#"
                        >
                          <div className="d-flex py-1">
                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                              {/* <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                  <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg> */}
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                Payment successfully completed
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>2 days
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* <!-- End Navbar --> */}
          <div className="container-fluid py-4">{children}</div>
          <Footer />
        </main>
        <div className="fixed-plugin">
          <Link
            className="fixed-plugin-button text-dark position-fixed px-3 py-2"
            href="#"
          >
            <i className="fa fa-cog py-2"> </i>
          </Link>
          <div className="card shadow-lg">
            <div className="card-header pb-0 pt-3 ">
              <div className="float-start">
                <h5 className="mt-3 mb-0">Argon Configurator</h5>
                <p>See our dashboard options.</p>
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
              <div>
                <h6 className="mb-0">Sidebar Colors</h6>
              </div>
              <Link href="#" className="switch-trigger background-color">
                <div className="badge-colors my-2 text-start">
                  <span
                    className="badge filter bg-gradient-primary active"
                    data-color="primary"
                    // onClick="sidebarColor(this)"
                  ></span>
                  <span
                    className="badge filter bg-gradient-dark"
                    data-color="dark"
                    // onClick="sidebarColor(this)"
                  ></span>
                  <span
                    className="badge filter bg-gradient-info"
                    data-color="info"
                    // onClick="sidebarColor(this)"
                  ></span>
                  <span
                    className="badge filter bg-gradient-success"
                    data-color="success"
                    // onClick="sidebarColor(this)"
                  ></span>
                  <span
                    className="badge filter bg-gradient-warning"
                    data-color="warning"
                    // onClick="sidebarColor(this)"
                  ></span>
                  <span
                    className="badge filter bg-gradient-danger"
                    data-color="danger"
                    // onClick="sidebarColor(this)"
                  ></span>
                </div>
              </Link>
              {/* <!-- Sidenav Type --> */}
              <div className="mt-3">
                <h6 className="mb-0">Sidenav Type</h6>
                <p className="text-sm">
                  Choose between 2 different sidenav types.
                </p>
              </div>
              <div className="d-flex">
                {/* <button
                  className="btn bg-gradient-primary w-100 px-3 mb-2 active me-2"
                  data-class="bg-white"
                  onClick="sidebarType(this)"
                >
                  White
                </button> */}
                <ThemeButton title="White" data="bg-white" />
                <ThemeButton title="Dark" data="bg-default" />
                {/* <button
                  className="btn bg-gradient-primary w-100 px-3 mb-2"
                  data-class="bg-default"
                  onClick="sidebarType(this)"
                >
                  Dark
                </button> */}
              </div>
              <p className="text-sm d-xl-none d-block mt-2">
                You can change the sidenav type just on desktop view.
              </p>
              {/* <!-- Navbar Fixed --> */}
              <div className="d-flex my-3">
                <h6 className="mb-0">Navbar Fixed</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input
                    className="form-check-input mt-1 ms-auto"
                    type="checkbox"
                    id="navbarFixed"
                    // onClick="navbarFixed(this)"
                  />
                </div>
              </div>
              <hr className="horizontal dark my-sm-4" />
              <div className="mt-2 mb-5 d-flex">
                <h6 className="mb-0">Light / Dark</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input
                    className="form-check-input mt-1 ms-auto"
                    type="checkbox"
                    id="dark-version"
                    // onClick="darkMode(this)"
                  />
                </div>
              </div>
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
