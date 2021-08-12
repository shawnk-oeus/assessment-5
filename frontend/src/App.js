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
import { getUserProfile } from './api/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken]= useState(null);

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

  const renderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    )
  }

  const renderHomePage = () => {
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    )
  }

  const renderGameLandingPage = () => {
    return (
      <GameLandingPage
        isLoggedIn={isLoggedIn}
        user={user}
        token={token}
        userProfile={userProfile}
      />
    )
  }

  const renderUserStatistics = () => {
      return (
        <UserStatistics
          user={user}
          userProfile={userProfile}
          />
      )
  }

  return (
    <div className="App">
      <Router>
        <div>
          <AppNav handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
          <Route exact path="/" render={renderHomePage} />
          <Route exact path="/login" render={renderLoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/startgame" render={renderGameLandingPage} />
          <Route exact path="/game" component={GamePage} />
          <Route exact path="/statistics" render={renderUserStatistics} />
        </div>
      </Router>
    </div>
  );
}

export default App;

