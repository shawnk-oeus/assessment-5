import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import GameLandingPage from './pages/GameLandingPage';
import AppNav from './components/AppNav.js';
import GamePage from './pages/GamePage';
import { getLoggedInUser, login } from './api/UserApi';
import UserStatistics from './pages/UserStatistics';
import { getUserProfile, updateUserProfile} from './api/UserProfile';
import UserContext from './context/UserContext'
import GameContext from './context/GameContext';

function App() {
  const initSquares = Array(81).fill( {
    currentValue: null,
    nextNumber: 0,
    clickable: true,
    partOfPuzzle: false,
    correctGuess: true,
    givenAsHint: false,
    } );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken]= useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [squares, setSquares] = useState(initSquares);

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let token = localStorage.getItem("auth-user");
        let response = await getLoggedInUser(token);
        let data = await response.json();
        let profile = await getUserProfile(data.id, token);
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
          setUserProfile(profile);
          setToken(token);
        }
      }
    }
    if (!user) {
      getUser();
    } 
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
      let profile = await getUserProfile(data.user.id, data.token);
      setUserProfile(profile);
      setToken(data.token)
      return (
        <Redirect to="/" />
      )
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
    setUserProfile(null);
    setToken(null);
  }

  // updateUserProfile takes in a user id, a user object of the format
  // {
  //   hints_given: 10,
  //   puzzles_attempted: 4,
  //   puzzles_solved: 4,​
  //   user: 2
  // }
  // and a user's JWT token

  const saveUserProfile = async () => {
    return await updateUserProfile(userProfile.user, userProfile, token);
  }

  const renderLoginPage = () => {
    return (
      <LoginPage
        handleLogin={handleLogin}
      />
    )
  }


  const renderGameLandingPage = () => {
    return (
      <GameLandingPage
        saveUserProfile={saveUserProfile}
      />
    )
  }

  return (
    <div className="App">
        <Router>
          <div>
            <UserContext.Provider value={{user: user, token: token, userProfile: userProfile, isLoggedIn:isLoggedIn, setUserProfile: setUserProfile}}>
            <GameContext.Provider value={{puzzle: puzzle, setPuzzle: setPuzzle, solution: solution, setSolution: setSolution, squares: squares, setSquares: setSquares}}>
              <AppNav handleLogout={handleLogout} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" render={renderLoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/startgame" render={renderGameLandingPage} />
              <Route exact path="/game" component={GamePage} />
              <Route exact path="/statistics" component={UserStatistics} />
            </GameContext.Provider>
            </UserContext.Provider>
            
          </div>
        </Router>
    </div>
  );
}

export default App;

