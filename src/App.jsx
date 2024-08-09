import { useEffect, useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Battlepage from "./Components/Battlepage/Battlepage";
import Pokemons from "./Components/Pokemons/Pokemons";
import Signin from "./Components/SignIn/Signin";
import Signup from "./Components/Signup/Signup";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import Pagelayout from "./Components/Pagelayout/Pagelayout";
import Rosterpage from "./Components/Rosterpage/Rosterpage";
import { AuthProvider } from "./Components/AuthContext";


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      setisLoggedIn(true);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        
        element={<Pagelayout isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
        }
      >
        <Route index element={<Pokemons />}></Route>
        <Route path="/battle-page" element={<Battlepage />}></Route>
        <Route path="/sign-in" element={<Signin setisLoggedIn={setisLoggedIn}  />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/rooster" element={<Rosterpage />}></Route>
        <Route path="/*" element={<PageNotFound />}></Route>
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
