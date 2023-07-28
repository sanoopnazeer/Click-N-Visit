import React, { useEffect } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };
  const { user } = useSelector((state) => ({ ...state.auth }));
  // const user = JSON.parse(localStorage.getItem("user"));
console.log(user)
  useEffect(() => {}, [user]);

  return (
    <header>
      <div className="nav-container">
        <Link to="/">
          CLICK <span>N</span> VISIT
        </Link>

        <nav>
          {user?.userExists ? (
            <>
              <Link to="/view-appointments">Appointments</Link>
              <Link to="/my-wallet">Wallet</Link>
              <Link to="/messenger">Messages</Link>
              <Link to="/user-profile">{user?.userExists?.firstname}</Link>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
