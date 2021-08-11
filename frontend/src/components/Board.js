import React from 'react';
import '../App.css';
import Square from './Square';

const Board = (props) => {

  const renderSquare = (i) => {
    return (
      <Square 
            value={props.squares[i].currentValue}
            clickable={props.squares[i].clickable}
            givenAsHint={props.squares[i].givenAsHint}
            onClick={() => props.onClick(i)}
            />
    );
  }

  const renderRow = (i) => {
    return (
      <div className="board-row">
          {renderSquare(i)}
          {renderSquare(i+1)}
          {renderSquare(i+2)}     
          {renderSquare(i+3)}
          {renderSquare(i+4)}
          {renderSquare(i+5)}
          {renderSquare(i+6)}
          {renderSquare(i+7)}
          {renderSquare(i+8)}
      </div>
    )
  }

    return (
      <div>
        { renderRow(0) }
        { renderRow(9) }
        { renderRow(18) }
        { renderRow(27) }
        { renderRow(36) }
        { renderRow(45) }
        { renderRow(54) }
        { renderRow(63) }
        { renderRow(72) }
      </div>
    );
}

export default  Board;