  import React, { useState } from 'react'
import './Signup.css';
import { useNavigate } from 'react-router-dom';
  export default function Signup() {


    const navigate = useNavigate();
    const [responseData,setResponseData] = useState();
    const [signup, setSignup] = useState({
      username:"", 
      email:"", 
      password:""})


    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!signup.username || !signup.email ||!signup.password) { 
        alert('All fields need to be filled in');
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/API/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signup),});

          const data = await response.json();
          if(data.error) {
            alert(data.error);
          } else {
            alert('You are succesfully signed up!');
            setResponseData(data);
            navigate('/sign-in');
          }
      } catch (error) {
        alert(error.message);
      }
    };
    


    
      return (
        
          <div className="signup-container">
            <form onSubmit={handleSubmit}  className="signup-form">
              <input
                placeholder="Username"
                type="text"
                value={signup.username}
                onChange={(e) => setSignup({ ...signup, username: e.target.value })}
              />
              <input
                placeholder="Email"
                type="email"
                value={signup.email}
                onChange={(e) => setSignup({ ...signup, email: e.target.value })}
              />
              <input
                placeholder="Password"
                type="password"
                value={signup.password}
                onChange={(e) => setSignup({ ...signup, password: e.target.value })}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        
      );
    }
