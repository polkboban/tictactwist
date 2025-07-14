import type { CellValue, Board, WinningCombination } from '../types';

// checkwinner
export function checkWinner(board: Board): { winner: CellValue; winningCombo: WinningCombination | null } {
  const winPatterns: number[][][] = [
    // row
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // column
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonal
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

// draw
export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

// aimove
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

export function createEmptyBoard(): Board {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
}

// ai
export function getBestMove(board: Board, aiPlayer: CellValue): [number, number] | null {
  const cloneBoard = (b: Board): Board => b.map(row => [...row]);
  
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
  
  const winningMove = canWin(aiPlayer, board);
  if (winningMove) return winningMove;
  
  const blockingMove = canWin(humanPlayer, board);
  if (blockingMove) return blockingMove;
  
  if (board[1][1] === null) return [1, 1];
  
  const corners: [number, number][] = [[0, 0], [0, 2], [2, 0], [2, 2]];
  for (const [row, col] of corners) {
    if (board[row][col] === null) return [row, col];
  }
  
  return getRandomMove(board);
}