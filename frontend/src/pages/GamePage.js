import React, {useState, useEffect} from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import '../App.css';
import Board from '../components/Board'


const GamePage = ({puzzle, solution, user, token, newPuzzle}) => {
    const initSquares = Array(81).fill( {
                                currentValue: null,
                                nextNumber: 0,
                                clickable: true,
                                correctGuess: false,
                                givenAsHint: false,
                                } );

    const [squares, setSquares] = useState(initSquares);


    useEffect(() => {
      const squaresTemp = JSON.parse(JSON.stringify(squares));

      for (let i=0; i < squaresTemp.length; i++ ) {
        if (puzzle[i] !== 0) {
          squaresTemp[i].currentValue = puzzle[i];
          squaresTemp[i].clickable = false;
        }
      }
      setSquares(squaresTemp);
    }, [puzzle])

  const handleClick = (i) => {
    // if the square is part of the original puzzle, don't allow the user to click
    if (!squares[i].clickable) {
      return;
    }

    const squaresTemp = JSON.parse(JSON.stringify(squares))

    squaresTemp[i].currentValue = squares[i].nextNumber === 9 ? null : squares[i].nextNumber+1;
    squaresTemp[i].nextNumber = squares[i].currentValue === 9? null: squares[i].currentValue+1;
    squaresTemp[i].correctGuess = false;
    setSquares(squaresTemp);
  }

  const resetPuzzle = () => {
    const squaresTemp = JSON.parse(JSON.stringify(squares))
    for (let i=0; i < squaresTemp.length; i++ ) {
      if (puzzle[i] === 0) {
        squaresTemp[i].currentValue = null;
        squaresTemp[i].clickable = true;
      }
    }
    setSquares(squaresTemp);
  }

  const checkSolution = () => {
    for (let i=0; i < squares.length; i++) {
        if (squares[i].currentValue !== solution[i]) {
           window.alert("Your solution is not correct."); 
           return;
        } 
    }
    const squaresTemp = JSON.parse(JSON.stringify(squares));
    for (let i=0; i<squaresTemp.length; i++) {
      squaresTemp[i].clickable = false;
    }
    setSquares(squaresTemp);
    window.alert("Congratulations, you solved the puzzle!");
    // add a function call here to update puzzles solved
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

  const getHint = () => {
    
    const i = Math.floor(Math.random() * 81);
    
    if (squares[i].currentValue !== solution[i]) {
      const squaresTemp = JSON.parse(JSON.stringify(squares));
      squaresTemp[i].currentValue = solution[i];
      squaresTemp[i].clickable = false;
      squaresTemp[i].givenAsHint = true;
      setSquares(squaresTemp);
      //add a function call here to update hints given
    }
    else {
      getHint();
    }
  }

  return (
    <div>
      {console.log("Puzzle:", puzzle)}
      {console.log("Solution:", solution)}
      { puzzle !== null && solution !== null && 
        <div className="game">
          <div className="game-board">
            <Board
              squares={squares}
              onClick={(i) => handleClick(i)}
              />
          </div>
          <div className="game-info">
            <div>
              <button onClick={getHint}>Get a Hint</button>
              <br />
              <br />
              <button onClick={checkSolution}>Check Solution</button>
              <br />
              <br />
              <button onClick={showSolution}>Show Solution</button>
              <br />
              <br />
              <button onClick={resetPuzzle}>Reset Puzzle</button>
              <br />
              <br />
              <button onClick={newPuzzle}>New Puzzle</button>
            </div>
          </div>
      </div>
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