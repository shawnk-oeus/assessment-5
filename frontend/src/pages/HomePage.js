import React from 'react';

const HomePage = ({ user }) => {

  return (
    <div>
      <h1>Home Page</h1>
      {
        user &&
        <div>
          Hi {user.username}
        </div>
      }
      {
        !user &&
        <div>
          Login to play a game!
        </div>
      }
    </div>
  );
};

export default HomePage;
