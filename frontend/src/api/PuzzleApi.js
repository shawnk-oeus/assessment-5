const processBoard= (squares) => {
  const SIZE = 9;
  let board = [];
  for (let i=0; i < SIZE ** 2; i++) {
      board.push(0);
  }
  for (const square of squares) {
    board[square.x + (square.y * 9)] = square.value;
  }
  return board;
}

const getSolution = async (board) => {
  let boardStringObject = {'puzzle': board.join('')};
  let response = await fetch('https://solve-sudoku.p.rapidapi.com/',
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-key': '32eaca1fd7msh693c4e9ef3edeafp1e4102jsn01782cff0ca2',
      'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com'
    },
    body: JSON.stringify(boardStringObject)
  });
  const data = await response.json(); 
  const solution = await data.solution.split('').map(x => parseInt(x));
  return solution;
}

const getPuzzle = async (difficulty) => {
  let response = await fetch(
    `http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=${difficulty}`);
    let data = await response.json();
    let board = await processBoard(data['squares']);
    let solution = [];
    // let solution = getSolution(board);
    return await {"board" : board, "solution": solution};
}



export { getPuzzle }