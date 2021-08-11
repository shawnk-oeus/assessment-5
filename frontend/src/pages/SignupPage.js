import React from 'react';
import { signupUser } from '../api/UserApi';

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    let response = await signupUser(userObject);
    let data = await response.json();
    console.log("Signup: ", data);
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      history.push('/');
    }

  }

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label>User Name:</label>
        <input type='text' placeholder='Enter username' name='username' />
        <br />
        <label>Password:</label>
        <input type='password' name='password' />
        <br />
        <button type='submit' >Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
