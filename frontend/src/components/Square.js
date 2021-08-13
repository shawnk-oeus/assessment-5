import React from 'react';
import '../App.css';

// props.correctGuess {background: 'red'}

const Square = (props) =>  {
    let selectedStyle = props.givenAsHint ? {color: 'green'} : !props.clickable ? {color: 'blue'} : null;
    if (selectedStyle !== null && !props.correctGuess) {
      selectedStyle.background = 'red';
    } else if (selectedStyle === null && !props.correctGuess) {
      selectedStyle = {background: 'red'}
    }

    return (
      <button className="square" 
        style={ selectedStyle }
        onClick={ props.onClick }>
        { props.value }
      </button>
    );
}

export default Square;