import React, { useContext } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import '../App.css';
import Board from '../components/Board'
import { Button, Container, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import GameContext from '../context/GameContext';

const GamePage = ({ newPuzzle}) => {

    
  const { userProfile, setUserProfile, saveUserProfile} = useContext(UserContext);
  const {puzzle, solution, squares, setSquares } = useContext(GameContext);


  const handleClick = (i) => {
    // if the square is part of the original puzzle, don't allow the user to click
    if (!squares[i].clickable) {
      return;
    }

    const squaresTemp = JSON.parse(JSON.stringify(squares))

    squaresTemp[i].currentValue = squares[i].nextNumber === 9 ? null : squares[i].nextNumber+1;
    squaresTemp[i].nextNumber = squares[i].currentValue === 9? null: squares[i].currentValue+1;
    setSquares(squaresTemp);
  }

  const resetPuzzle = () => {
    const squaresTemp = JSON.parse(JSON.stringify(squares))
    for (let i=0; i < squaresTemp.length; i++ ) {
      if (puzzle[i] === 0) {
        squaresTemp[i].currentValue = null;
        squaresTemp[i].nextNumber = 0;
        squaresTemp[i].clickable = true;
        squaresTemp[i].correctGuess = true;
        squaresTemp[i].givenAsHint = false;
      }
    }

    setSquares(squaresTemp);
  }

  const checkSolution = () => { 
    let correctSolution = true;

    for (let i=0; i < squares.length; i++) {
        if (squares[i].currentValue !== solution[i]) {
           correctSolution = false;
           squares[i].correctGuess = false;
        } 
    }
    
    const squaresTemp = JSON.parse(JSON.stringify(squares));
    setSquares(squaresTemp);
    if (!correctSolution) {
      window.alert("Your solution is not correct."); 
    } else {
      window.alert("Congratulations, you solved the puzzle!");
      const userProfileCopy = JSON.parse(JSON.stringify(userProfile))
      userProfileCopy.puzzles_solved += 1;
      setUserProfile(userProfileCopy);
      saveUserProfile();
    }
 
    // add an option to play again here
    return;
  }

  const showSolution = () => {
    const squaresTemp = JSON.parse(JSON.stringify(squares));
    for (let i=0; i < squaresTemp.length; i++ ) {
      if (squares[i].currentValue !== solution[i]) {
        squaresTemp[i].currentValue = solution[i];
        squaresTemp[i].clickable = false;
        squaresTemp[i].givenAsHint = true;
      }
    }
    setSquares(squaresTemp);
  }

  const getHint = (counter = 0) => {
    
    const i = Math.floor(Math.random() * 81);


    if (squares[i].currentValue !== solution[i]) {
      const squaresTemp = JSON.parse(JSON.stringify(squares));
      squaresTemp[i].currentValue = solution[i];
      squaresTemp[i].clickable = false;
      squaresTemp[i].givenAsHint = true;

      const userProfileCopy = JSON.parse(JSON.stringify(userProfile))
      userProfileCopy.hints_given += 1;
      setUserProfile(userProfileCopy);
      saveUserProfile();
      setSquares(squaresTemp);
    }
    else {
      if (counter <= 81) {
        getHint(counter++);
      } else {
        return;
      }
      
    }
  }

  return (
    <div>
      { puzzle !== null && solution !== null && 
        <Container>
          <div className="game">
            <Col md="auto" className="game-board">
              <Board
                squares={squares}
                onClick={(i) => handleClick(i)}
                />
            </Col>
            <Col md="auto" className="game-info">
              <div>
                <Button variant="success" size="sm" onClick={getHint}>Get a Hint</Button>
                <br />
                <br />
                <Button size="sm" onClick={checkSolution}>Check Solution</Button>
                <br />
                <br />
                <Button size="sm" onClick={showSolution}>Show Solution</Button>
                <br />
                <br />
                <Button size="sm" variant="danger" onClick={resetPuzzle}>Reset Puzzle</Button>
                <br />
                <br />
                <Button size="sm" variant="danger" onClick={newPuzzle}>New Puzzle</Button>
              </div>
            </Col>
          </div>
        </Container>
        
      }
      {
        puzzle === null &&
        <div>
          <Redirect to='/startgame' />
        </div>

      }
    </div>
    
  );
  
}

export default GamePage;