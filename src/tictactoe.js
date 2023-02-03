import React, { useState,useEffect } from "react";

const Confetti = ({ color }) => {
    return (
      <div
        className={`confetti ${color}`}
        style={{
          animationDelay: `${Math.random() * 3}s`,
          left: `${Math.random() * 100}%`
        }}
      />
    );
  };
  
  const ConfettiContainer = ({ winner }) => {
    const [showConfetti, setShowConfetti] = useState(false);
  
    useEffect(() => {
      if (winner) {
        setShowConfetti(true);
      }
    }, [winner]);
  
    return showConfetti ? (
      <div className="confetti-container">
        {Array.from({ length: 200 }).map((_, i) => (
            <>
          <Confetti key={i} color={"blue"} />
          <Confetti key={i} color={"green"} />
          <Confetti key={i} color={"red"} />
          </>
        ))}
      </div>
    ) : null;
  };

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(()=>{
    if(calculateWinner(squares)==="X"||calculateWinner(squares)==="O"){
        setConfettiActive(true)
    }
  },[squares])

  const handleClick = (index) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[index]) {
      return;
    }
    squaresCopy[index] = isXNext ? "X" : "O";
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setConfettiActive(false);
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
      >
        {squares[index]}
      </button>
    );
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="tic-tac-toe-container">
        {confettiActive?<ConfettiContainer winner={winner} />:""}
        
      <div className="tic-tac-toe-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
