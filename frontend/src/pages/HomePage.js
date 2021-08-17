import React, { useContext } from 'react';
import UserContext from "../context/UserContext"

const HomePage = () => {
  const {user} = useContext(UserContext);

  return (
    <div>
      {
        user &&
        <div>
          <h2>Welcome {user.first_name}</h2>
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Sudoku_puzzle_hard_for_brute_force.jpg" alt="Sudoku puzzle"/>
          <h4>Click above to play a game!</h4>
        </div>
      }
      {
        !user &&
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Sudoku_puzzle_hard_for_brute_force.jpg" alt="Sudoku puzzle"/>
          <h4>Login above to play a game!</h4>    
        </div>
      }     
   </div>
  ) 
};

export default HomePage;
