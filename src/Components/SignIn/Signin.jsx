import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { AuthContext } from '../AuthContext';

export default function Signin( {setisLoggedIn}) {
  const navigate = useNavigate();
  const {signin, setSignin, tokenBox,setTokenBox} = useContext(AuthContext);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!signin.email || !signin.password) { 
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/API/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signin),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert('Successfully logged in'); 
        localStorage.setItem('token', data.token);
        setisLoggedIn(true);
        setTokenBox(true);
        navigate('/');
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          placeholder="Email"
          type="email"
          value={signin.email}
          onChange={(e) => setSignin({ ...signin, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={signin.password}
          onChange={(e) => setSignin({ ...signin, password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}