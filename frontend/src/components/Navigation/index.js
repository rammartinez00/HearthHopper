import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormPage";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/spots/new">Post Your Spot</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className="sessionBtns">
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <nav className="navBar">
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      <div>{isLoaded && sessionLinks}</div>
    </nav>
  );
}

export default Navigation;
