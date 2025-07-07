import { useState } from 'react'
import './App.css'

function App() {
  const [board,setboard] = useState(Array(9).fill(null)) // Array declaration 
  const [Xturn,setXturn] = useState(true) // true because it is xturn 

  const handleClick = (index) => {   // check the inndex of board
    if(board[index] || calculateWinner(board)) 
      return;
    const newBoard = [...board]; // (...) create a copy current board
    newBoard[index] = Xturn ? 'X' : 'O' ; 
    setboard(newBoard);
    setXturn(!Xturn); // flip the turn
  } ;

  const winner = calculateWinner(board); // winner calculation

  const handleReset = () => {    // to reset the state
    setboard(Array(9).fill(null));
    setXturn(true);
  };

  return (
    <>
    <h1>Tic Tac Toe</h1>
        <div className="board">
          {board.map((cell, i) => (
            <div
              key={i}
              className="cell"
              onClick={() => handleClick(i)}
            >
              {cell}
            </div>
          ))}
        </div>

        <div>
          <h3>
            {winner
                    ? `winner : ${winner}`        // If there's a winner, show it
                    : board.every(Boolean)
                      ? 'Draw!'                   // If all cells are filled and no winner, it's a draw
                      : `Next: ${Xturn ? 'X' : 'O'}`  // Otherwise, show whose turn it is
                  }
          </h3>
          <button onClick={handleReset} className="button">Reset</button>
        </div>

     
    </>
  );
};

// Winner calculation 
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],  // Rows index
    [0,3,6],[1,4,7],[2,5,8], // cols index
    [0,4,8],[2,4,6] //diagonal
  ];
  for (let [a,b,c] of lines){
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) // condition to check in the index
      return squares[a];
  }
   return null ;
}



export default App
