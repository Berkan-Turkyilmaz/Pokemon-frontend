import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './Pagelayout.css';

export default function Pagelayout({isLoggedIn,setisLoggedIn}) {


  const navigate = useNavigate();
  const handleLogout = () => {
localStorage.removeItem("token");
setisLoggedIn(false);
navigate ('/');
  }


  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <NavLink to="/" className="nav-link">HOME</NavLink>
          <NavLink to="/battle-page" className="nav-link">BATTLE PAGE</NavLink>
          <NavLink to="/leaderboard" className="nav-link">LEADERBOARD</NavLink>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <NavLink to="/rooster" className="nav-link">My Rooster Page</NavLink>
              <button onClick={handleLogout} className="nav-button">LOGOUT</button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" className="nav-link">SIGN IN</NavLink>
              <NavLink to="/sign-up" className="nav-link">SIGN UP</NavLink>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2024 Pokemon Battle, All Rights Reserved</p>
      </footer>
    </>
  );
};