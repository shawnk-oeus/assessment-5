import React, { useContext } from 'react';
import UserContext from "../context/UserContext"


const HomePage = () => {
  const {user} = useContext(UserContext);

  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Sudoku_puzzle_hard_for_brute_force.jpg" alt="Sudoku puzzle"/>
      {
        user &&
        <div>
          <h2>Welcome {user.first_name}</h2>
          <p>Click above to play a game!</p>
        </div>
      }
      {
        !user &&
        <div>
          <h2>Login above to play a game!</h2>
        </div>
      }     
   </div>
  ) 
};

export default HomePage;
