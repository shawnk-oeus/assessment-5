import React, { useContext } from 'react';
import UserContext from "../context/UserContext"


const HomePage = () => {
  const userContext = useContext(UserContext);

  return (
    <div>
      {
        userContext.user &&
        <div>
          Welcome {userContext.user.first_name}
        </div>
      }
      {
        !userContext.user &&
        <div>
          <h1>Login to play a game!</h1>
        </div>
      }     
   </div>
  ) 
};

export default HomePage;
