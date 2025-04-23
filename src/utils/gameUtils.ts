import type { CellValue, Board, WinningCombination } from '../types';

// Check for a winner on the board
export function checkWinner(board: Board): { winner: CellValue; winningCombo: WinningCombination | null } {
  const winPatterns: number[][][] = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a[0]][a[1]] !== null &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return {
        winner: board[a[0]][a[1]],
        winningCombo: pattern as WinningCombination
      };
    }
  }

  return { winner: null, winningCombo: null };
}

// Check if the board is full (draw)
export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

// Get a random valid move for AI
export function getRandomMove(board: Board): [number, number] | null {
  const emptyPositions: [number, number][] = [];
  
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        emptyPositions.push([row, col]);
      }
    }
  }
  
  if (emptyPositions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  return emptyPositions[randomIndex];
}

// Create a new empty board
export function createEmptyBoard(): Board {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

// Simple AI that tries to win if possible, block opponent if needed, or plays randomly
export function getBestMove(board: Board, aiPlayer: CellValue): [number, number] | null {
  // Clone the board to avoid modifying the original
  const cloneBoard = (b: Board): Board => b.map(row => [...row]);
  
  // Check if player can win in the next move
  const canWin = (player: CellValue, b: Board): [number, number] | null => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (b[row][col] === null) {
          const boardCopy = cloneBoard(b);
          boardCopy[row][col] = player;
          const { winner } = checkWinner(boardCopy);
          if (winner === player) {
            return [row, col];
          }
        }
      }
    }
    return null;
  };
  
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  
  // Try to win if possible
  const winningMove = canWin(aiPlayer, board);
  if (winningMove) return winningMove;
  
  // Block opponent if they can win
  const blockingMove = canWin(humanPlayer, board);
  if (blockingMove) return blockingMove;
  
  // Take center if available
  if (board[1][1] === null) return [1, 1];
  
  // Take a corner if available
  const corners: [number, number][] = [[0, 0], [0, 2], [2, 0], [2, 2]];
  for (const [row, col] of corners) {
    if (board[row][col] === null) return [row, col];
  }
  
  // Otherwise, make a random move
  return getRandomMove(board);
}