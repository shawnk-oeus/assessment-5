import React from 'react';
import { Redirect } from 'react-router';

const HomePage = ({ user }) => {

  return (
    <div>
      {
        user &&
        <div>
          Welcome {user.username}
        </div>
      }
      {
        !user &&
        <div>
          <h1>Login to play a game!</h1>
        </div>
      }
    </div>
  );
};

export default HomePage;
