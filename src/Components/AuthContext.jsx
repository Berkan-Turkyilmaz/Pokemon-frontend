import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signin, setSignin] = useState({
    email: '',
    password: '',
  });

  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [userScore, setUserScore] = useState(wins-loses);
  const [ tokenBox, setTokenBox ] = useState(false);
  const [randomPoke, setRandomPoke] = useState();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [botPoke, setBotPoke ] = useState();

  return (
    <AuthContext.Provider value={{ signin, 
      setSignin, 
      randomPoke, 
      setRandomPoke, 
      buttonVisible, 
      setButtonVisible,
      tokenBox, 
      setTokenBox, 
      botPoke, 
      setBotPoke,
      userScore,
      setUserScore}}>
      {children}
    </AuthContext.Provider>
  );
};