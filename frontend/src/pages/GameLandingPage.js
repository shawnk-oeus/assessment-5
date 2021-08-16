import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getPuzzle } from '../api/PuzzleApi.js';
import GamePage from './GamePage.js';
import { Form, Button, Container } from 'react-bootstrap';
import UserContext from '../context/UserContext.js';
import GameContext from '../context/GameContext.js';

const GameLandingPage = ({ saveUserProfile }) => {
  // const initSquares = Array(81).fill( {
  //   currentValue: null,
  //   nextNumber: 0,
  //   clickable: true,
  //   partOfPuzzle: false,
  //   correctGuess: true,
  //   givenAsHint: false,
  //   } );
  
  
  // const [puzzle, setPuzzle] = useState(null);
  // const [solution, setSolution] = useState(null);
  // const [squares, setSquares] = useState(initSquares);

  const [difficulty, setDifficulty] = useState(1);
  const userContext = useContext(UserContext);
  const {puzzle, squares, setPuzzle, setSquares, setSolution} = useContext(GameContext);

  const handleChange = (evt) => {
    setDifficulty(evt.target.value)
  }
  
  useEffect(() => {
    if (puzzle !== null) {
      const squaresTemp = JSON.parse(JSON.stringify(squares));

      for (let i=0; i < squaresTemp.length; i++ ) {
        if (puzzle[i] !== 0) {
          squaresTemp[i].currentValue = puzzle[i];
          squaresTemp[i].clickable = false;
          squaresTemp[i].partOfPuzzle = true;
        }
      }
      setSquares(squaresTemp);
    }

  }, [puzzle])


  const getPuzzleAndSolution = async (event) => {
    event.preventDefault();
    const puzzleAndSolutionFromApi = await getPuzzle(difficulty);
    setPuzzle(puzzleAndSolutionFromApi["board"]);
    setSolution(puzzleAndSolutionFromApi["solution"]);
    const userProfileCopy = JSON.parse(JSON.stringify(userContext.userProfile))
    userProfileCopy.puzzles_attempted += 1;
    userContext.setUserProfile(userProfileCopy);
    saveUserProfile();
  }

  const renderGamePage = () => {
    return (
      <GamePage
        newPuzzle={newPuzzle}
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
            userContext.isLoggedIn &&
            <Container>             
            <Form onSubmit={getPuzzleAndSolution}>
              <Form.Label>
              Select a puzzle difficulty:
              </Form.Label>
              <Form.Control as="select" aria-label="Select difficulty" 
              value={difficulty} onChange={handleChange}>
                <option value='1'>Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
              </Form.Control>    
              <Button variant='primary' type='submit'>Submit</Button>
            </Form>
          </Container>

          }
          {
            !userContext.isLoggedIn &&
            <div>
              <Redirect to='/login'/>
            </div>
          } 
        </div>
     }
     {  puzzle !== null && userContext.isLoggedIn &&
       <div>
          { renderGamePage() }
       </div>
     }
    </div>
  )
}

export default GameLandingPage;
