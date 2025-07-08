import { useState } from 'react';
import './App.css';

function App() {
  const [board, setboard] = useState(Array(9).fill(null)); // Array declaration 
  const [Xturn, setXturn] = useState(true); // true because it is xturn
  const [winCell, setWinCell] = useState([]); // winning cell indices
  const [winner, setWinner] = useState(null); // winner state

  const handleClick = (index) => {   // check the index of board
    if (board[index] || winner) 
      return;

    const newBoard = [...board]; // (...) create a copy current board
    newBoard[index] = Xturn ? 'X' : 'O';
    setboard(newBoard);
    setXturn(!Xturn); // flip the turn

    const result = calculateWinner(newBoard); // winner calculation
    if (result) {
      setWinner(result.winner); // stores winner
      setWinCell(result.indices);
    }
  };

  const handleReset = () => {    // to reset the state
    setboard(Array(9).fill(null));
    setXturn(true);
    setWinner(null);
    setWinCell([]);
  };
  function checkcell(cell) {
  return cell ==null ;
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {board.every(cell => cell=== null) && (
        <>
        <button onClick={() => setXturn(true)}> Play as X</button>
        <button onClick={() => setXturn(false)}> Play as O </button>
        </>
      )}
      <div className="board">
        {board.map((cell, i) => ( // maping through the cells and indexes
          <div
            key={i}
            className={`cell ${Array.isArray(winCell) && winCell.includes(i) ? 'highlight' : ''}`} //highlits the wiining indices
            onClick={() => handleClick(i)
            }
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
            : `Next: ${Xturn ? 'X' : 'O'}` //otherwise shows whose turn is
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
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows index
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // cols index
    [0, 4, 8], [2, 4, 6]              // diagonal
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) // condition to check in the index
      return { winner: squares[a], indices: [a, b, c] };
  }
  return null;
}

export default App;
