import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="contact">
            <p>Hearth Hopper LLC</p>
            <span>
              <a href="https://www.linkedin.com/in/rami-martinez-2931099b/">
                <i className="fa-brands fa-linkedin link"></i>
              </a>
            </span>
            <span>
              <a href="https://github.com/rammartinez00">
                <i className="fa-brands fa-github-square link"></i>
              </a>
            </span>
            <span>
              <a href="https://github.com/rammartinez00/HearthHopper">
                <i className="fa-solid fa-code-fork link"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
