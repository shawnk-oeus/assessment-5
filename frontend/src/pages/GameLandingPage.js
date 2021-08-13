import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getPuzzle } from '../api/PuzzleApi.js';
import GamePage from './GamePage.js';
import { Form, Button } from 'react-bootstrap'

const test_puzzle = [
  0, 0, 5, 7, 6, 0, 2, 0, 0, 2, 0, 0,
  0, 0, 0, 7, 0, 8, 0, 7, 0, 0, 8, 0,
  0, 3, 0, 0, 0, 8, 4, 0, 6, 0, 7, 0,
  7, 4, 0, 0, 0, 5, 0, 8, 6, 1, 0, 6,
  8, 0, 7, 0, 0, 5, 0, 6, 1, 0, 4, 0,
  0, 2, 0, 4, 3, 0, 6, 0, 9, 8, 0, 1,
  0, 9, 2, 5, 7, 0, 6, 4, 0
];

const test_solution = [
  3, 8, 5, 7, 6, 4, 2, 1, 9, 2, 1, 4,
  9, 5, 3, 7, 6, 8, 6, 7, 9, 1, 8, 2,
  5, 3, 4, 9, 5, 8, 4, 1, 6, 3, 7, 2,
  7, 4, 3, 2, 9, 5, 1, 8, 6, 1, 2, 6,
  8, 3, 7, 4, 9, 5, 5, 6, 1, 3, 4, 8,
  9, 2, 7, 4, 3, 7, 6, 2, 9, 8, 5, 1,
  8, 9, 2, 5, 7, 1, 6, 4, 3
];

const GameLandingPage = ({user, token, userProfile, isLoggedIn, saveUserProfile}) => {
  const [difficulty, setDifficulty] = useState(1);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);


  const handleChange = (evt) => {
    setDifficulty(evt.target.value)
  }


  const getPuzzleAndSolution = async (event) => {
    event.preventDefault();
    const puzzleAndSolutionFromApi = await getPuzzle(difficulty);
    setPuzzle(puzzleAndSolutionFromApi["board"]);
    setSolution(puzzleAndSolutionFromApi["solution"]);
    userProfile.puzzles_attempted += 1;
    saveUserProfile();
  }

  const renderGamePage = () => {
    return (
      <GamePage
        puzzle={puzzle}
        solution={solution}
        user={user}
        newPuzzle={newPuzzle}
        userProfile={userProfile}
        saveUserProfile={saveUserProfile}
        />
    );
  }

  const newPuzzle = () => {
    setPuzzle(null);
    setSolution(null);
    return (
      <div>
          <Redirect to="/startgame" />
      </div>
    );
  }

  return (
    <div>
      { puzzle === null &&
          <div>
          {
            isLoggedIn &&
            <div>             
              <h2> Let's Play A Game! </h2>
              <form onSubmit={getPuzzleAndSolution}>
                <label>
                Select a puzzle difficulty:
                <br />
                  <select value={difficulty} onChange={handleChange}>
                    <option value='1'>Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </select>
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
          </div>

          }
          {
            !isLoggedIn &&
            <div>
              <Redirect to='/login'/>
            </div>
          } 
        </div>
     }
     {  puzzle !== null && isLoggedIn &&
       <div>
          { renderGamePage() }
       </div>
     }
    </div>
  )
}

export default GameLandingPage;
