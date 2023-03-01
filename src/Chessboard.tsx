import React, { useState } from 'react';

type Position = [number, number];

function Chessboard() {
  const [knightPos, setKnightPos] = useState<Position>([0, 0]);

  // Function to calculate the possible moves for a Knight given its current position
  function getKnightMoves(x: number, y: number): Position[] {
    const moves: Position[] = [];

    // Generate all 8 possible moves
    const possibleMoves: Position[] = [
      [x + 1, y + 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x + 1, y - 2],
      [x - 1, y - 2],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y + 2],
    ];

    // Check if each move is within the bounds of the chessboard
    for (let i = 0; i < possibleMoves.length; i++) {
      const [newX, newY] = possibleMoves[i];
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        moves.push(possibleMoves[i]);
      }
    }

    return moves;
  }

  // Handle click events on the chessboard squares
  function handleSquareClick(x: number, y: number) {
    setKnightPos([x, y]);
  }

  // Calculate the possible moves for the Knight's current position
  const possibleMoves = getKnightMoves(knightPos[0], knightPos[1]);

  // Render the chessboard
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', height: '400px' }}>
      {Array.from({ length: 64 }).map((_, i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const isKnightHere = x === knightPos[0] && y === knightPos[1];
        const isPossibleMove = possibleMoves.some(move => move[0] === x && move[1] === y);
        const black = (x + y) % 2 === 1;
        const backgroundColor = black ? 'black' : 'white';

        return (
          <div
            key={i}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor,
              color: isPossibleMove ? 'green' : 'inherit',
              fontWeight: isKnightHere ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleSquareClick(x, y)}
          >
            {isKnightHere ? '♘' : '♞'}
          </div>
        );
      })}
    </div>
  );
}

export default Chessboard;
