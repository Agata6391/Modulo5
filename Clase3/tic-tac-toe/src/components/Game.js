import React, { useEffect, useState } from "react";
import Board from "./board";

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("2P"); //dos jugadores y 1P es un jugador
  const [winner, setWinner] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(winner);
    } else if (!squares.includes(null)) {
      setWinner("Draw");
    }
  }, [squares]);
  useEffect(() => {
    if (mode === "1P" && !xIsNext && !winner) {
      const avaibleSquares = squares.map((square, i) => (square === null ? i : null)).filter((i) => i !== null);
      const randomMoves = avaibleSquares[Math.floor(Math.random() * avaibleSquares.length)];
      handleClick(randomMoves);
    }  
  },[xIsNext]);
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c] 
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className={`game ${darkMode ? "dark-mode" : ""}`}>
      <h1>Michi tac toe</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="info">
        <p>
          {winner ? `winner:${winner}` : `Next palyer: ${xIsNext ? "X" : "O"}`}
        </p>
      </div>
      <button onClick={resetGame}>Reset</button>
      <button onClick={toggleMode}>Dark Mode</button>
    </div>
  );
};

export default Game;
