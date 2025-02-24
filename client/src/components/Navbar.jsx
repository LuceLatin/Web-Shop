import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const Navbar = () => {
  const navigation = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderList = () => {
    if (state && !state.isAdmin) {
      return (
        <>
          <li>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeMenu}>
              Create Event
            </Link>
          </li>
          <li>
            <Link to="/messages" onClick={closeMenu}>
              Chat
            </Link>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigation("/signin");
                closeMenu();
              }}
            >
              Logout
            </button>
          </li>
        </>
      );
    }
    if (state && state.isAdmin) {
      return (
        <>
          <li>
            <Link to="/profile" onClick={closeMenu}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeMenu}>
              Create event
            </Link>
          </li>
          <li>
            <Link to="/signup" onClick={closeMenu}>
              Create user
            </Link>
          </li>
          <li>
            <Link to="/list-of-users" onClick={closeMenu}>
              List of users
            </Link>
          </li>
          <li>
            <Link to="/list-of-events" onClick={closeMenu}>
              List of events
            </Link>
          </li>
          <li>
            <Link to="/messages" onClick={closeMenu}>
              Chat
            </Link>
          </li>
          <li>
            <button
              className="btn"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                navigation("/signin");
                closeMenu();
              }}
            >
              Logout
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div
          className={`menu-icon ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <Link to={state ? "/" : "/signin"} className="brand-logo left"></Link>
        <ul id="nav-mobile" className={`right ${isMenuOpen ? "open" : ""}`}>
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
