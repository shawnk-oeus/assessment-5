import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => {

  if (isLoggedIn) {
    return <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  }

  return (
    <div>
    <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>User Name:</label>
        <input type='text' placeholder='Enter username' name='username' />
        <br />
        <label>Password:</label>
        <input type='password' name='password' />
        <br />
        <button type='submit' >Submit</button>
        <br />
      </form>
    </div>
  );
};

export default Login;
