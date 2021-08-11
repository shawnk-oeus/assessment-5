import React from 'react';
import '../App.css';

const Square = (props) =>  {
    const selectedStyle = props.givenAsHint ? {color: 'red'} : !props.clickable ? {color: 'blue'} : null;

    return (
      <button className="square" 
        style={ selectedStyle }
        onClick={ props.onClick }>
        { props.value }
      </button>
    );
}

export default Square;