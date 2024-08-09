import React, { useContext, useState } from 'react';
import './Rosterpage.css';
import { AuthContext } from '../AuthContext';

export default function Rosterpage() {
  const { signin, randomPoke, setButtonVisible, buttonVisible, tokenBox, setTokenBox, userScore, setUserScore } = useContext(AuthContext);

  const defaultProfileImage = "https://pbs.twimg.com/profile_images/1538108303372439552/QRV20CVc_400x400.jpg";
  
  const [score, setScore] = useState(0);

  const handleButtonClick = () => {
    setButtonVisible(true); // Butona tıklandığında buttonVisible'ı true yap
    setTokenBox(true);
  };

  return (
    <div className="roster-container">
      <div className="roster-left">
        <img src={defaultProfileImage} alt="Profile" className="profile-image" />
        <div className="user-info">
          <h2>Username: {signin.email}</h2>
          <p>Score: {userScore} </p>
        </div>
      </div>
      <div className="roster-right">
        {!buttonVisible ? (
          <button onClick={handleButtonClick} className="daily-pokemon-button">
            Get Your Daily Pokemon
          </button>
        ) : (
          randomPoke && (
            <div className="pokemon-display">
              <h3>Your Daily Pokemon:</h3>
              <div className="pokemon-card">
                <img src={randomPoke.sprites.front_default} alt={randomPoke.name} className="pokemon-image" />
                <div className="pokemon-name">{randomPoke.name}</div>
                <div className="pokemon-stats">
                  <p>Attack: {randomPoke.attack}</p>
                  <p>Defence: {randomPoke.defence}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )};