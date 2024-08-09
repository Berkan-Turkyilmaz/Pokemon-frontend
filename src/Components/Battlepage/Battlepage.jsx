import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './Battlepage.css'; // CSS dosyasını dahil edin

export default function Battlepage() {
  const [userHp, setUserHp] = useState(250);
  const [botHp, setBotHp] = useState(250);
  const { botPoke, randomPoke, setUserScore } = useContext(AuthContext);
  const [battle, setBattle] = useState(false);
  const [report, setReport] = useState("");
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    let intervalId;
    if (battle) {
      intervalId = setInterval(() => {
        const userDamage = Math.floor(randomPoke.attack * Math.random());
        const botDamage = Math.floor(botPoke.attack * Math.random());

        // Update HP values
        setUserHp(prevHp => Math.max(0, prevHp - botDamage));
        setBotHp(prevHp => Math.max(0, prevHp - userDamage));

        console.log(`You(${randomPoke.name}) dealt ${userDamage}. Bot(${botPoke.name}) dealt ${botDamage}`);
        setReport(`You(${randomPoke.name}) dealt ${userDamage}. Bot(${botPoke.name}) dealt ${botDamage}`);

      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId); 
    };
  }, [battle]);

  useEffect(() => {
    if (userHp <= 0 || botHp <= 0) {
      setBattle(false);
      if (userHp <= 0) {
        setReport(`You lost`);
        setUserScore(prevScore => prevScore - 1);
      } else if (botHp <= 0) {
        setReport(`You won`);
        setUserScore(prevScore => prevScore + 1);
      } else {
        setReport(`It's a draw`);
      }
    }
  }, [userHp, botHp]);

  const Fight = () => {
    setBattle(true);
    setShowButton(false);
    setReport("Fight started");
  }

  return (
    <div className="battlepage-container">
      <div className="poke-container left">
        <h2>Your Pokemon</h2>
        <span className='hp'>HP: {userHp}</span>
        <div className="pokemon-card">
          <img src={randomPoke.sprites.front_default} alt={randomPoke.name} className="pokemon-image" />
          <div className="pokemon-name">{randomPoke.name}</div>
          <div className="pokemon-stats">
            <p>Attack: {randomPoke.attack}</p>
            <p>Defense: {randomPoke.defence}</p>
          </div>
        </div>
      </div>
      <div className="start-battle-container">
        
          <div className="report-container">
            <h1 className='fightreport'>Fight Report</h1>
            <p className='reportt'>{report}</p>
          </div>
          {showButton && (
          <button onClick={Fight} className="start-battle-button">START BATTLE</button>
        )}
      </div>
      <div className="poke-container right">
        <h2>Bot's Pokemon</h2>
        <span className="hp">HP: {botHp}</span>
        <div className="pokemon-card">
          <img src={botPoke.sprites.front_default} alt={botPoke.name} className="pokemon-image" />
          <div className="pokemon-name">{botPoke.name}</div>
          <div className="pokemon-stats">
            <p>Attack: {botPoke.attack}</p>
            <p>Defense: {botPoke.defence}</p>
          </div>
        </div>
      </div>
    </div>
  );
}