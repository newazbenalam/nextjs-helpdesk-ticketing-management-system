"use client";
import { useEffect, useState } from 'react';
import '../globals.css'; // Ensure you import your global styles or specific styles for this component
import Link from 'next/link';

const Footer = () => {
  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer pt-3">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              {year && (
                <>
                  © {year}
                  {/* , made with <i className="fa fa-heart"></i> by */}
                  {/* <Link
                    href="https://www.creative-tim.com"
                    className="font-weight-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Link href="https://www.github.com/newazbenalam"> Newaz </Link>
                  </Link>
                  for a better web. */}
                </>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link
                  href="https://github.com/newazbenalam"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Newaz Ben Alam
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="https://github.com/newazbenalam"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
