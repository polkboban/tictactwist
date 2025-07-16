<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import Board from './Board.vue';
import ScoreBoard from './ScoreBoard.vue';
import GameControls from './GameControls.vue';
import { checkWinner, createEmptyBoard, getBestMove } from '../utils/gameUtils';
import type { CellValue, Board as BoardType, WinningCombination } from '../types';

const props = defineProps<{
  isAiMode: boolean;
}>();

const emit = defineEmits<{
  backToMenu: [];
}>();

const recentlyRemoved = ref<{ row: number; col: number } | null>(null);
const board = ref<BoardType>(createEmptyBoard());
const currentPlayer = ref<CellValue>('X');
const winner = ref<CellValue>(null);
const winningCombo = ref<WinningCombination | null>(null);
const isDraw = ref(false);
const gameOver = computed(() => winner.value !== null || isDraw.value);
const moveHistory = ref<{ row: number; col: number; player: CellValue }[]>([]);


const xWins = ref(0);
const oWins = ref(0);
const draws = ref(0);

const isDarkMode = ref(false);


const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
  
  localStorage.setItem('ticTacToeDarkMode', isDarkMode.value.toString());
};


onMounted(() => {
  const savedDarkMode = localStorage.getItem('ticTacToeDarkMode');
  if (savedDarkMode === 'true') {
    isDarkMode.value = true;
    document.body.classList.add('dark-theme');
  }
});


const makeMove = (row: number, col: number) => {
  if (board.value[row][col] === null && !gameOver.value) {
    // Find all moves for the current player
    const playerMoves = moveHistory.value.filter(move => move.player === currentPlayer.value);
    // If player already has 4 moves, remove the oldest one
    if (playerMoves.length >= 4) {
      const oldestMove = playerMoves[0];
      board.value[oldestMove.row][oldestMove.col] = null;
      const index = moveHistory.value.findIndex(m => m.row === oldestMove.row && m.col === oldestMove.col && m.player === currentPlayer.value);
      if (index !== -1) {
        moveHistory.value.splice(index, 1);
      }
      recentlyRemoved.value = { row: oldestMove.row, col: oldestMove.col };
      setTimeout(() => {
        recentlyRemoved.value = null;
      }, 500);
    }

    // Now add the new move
    board.value[row][col] = currentPlayer.value;
    moveHistory.value.push({ row, col, player: currentPlayer.value });

    const result = checkWinner(board.value);
    winner.value = result.winner;
    winningCombo.value = result.winningCombo;

    if (winner.value) {
      if (winner.value === 'X') xWins.value++;
      else if (winner.value === 'O') oWins.value++;
    } else {
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';

      if (props.isAiMode && currentPlayer.value === 'O') {
        setTimeout(() => {
          const aiMove = getBestMove(board.value, 'O');
          if (aiMove) {
            makeMove(aiMove[0], aiMove[1]);
          }
        }, 600);
      }
    }
  }
};



const restartGame = () => {
  board.value = createEmptyBoard();
  currentPlayer.value = 'X';
  winner.value = null;
  winningCombo.value = null;
  isDraw.value = false;
};

const resetScores = () => {
  xWins.value = 0;
  oWins.value = 0;
  draws.value = 0;
  restartGame();
};

watch([xWins, oWins, draws], () => {
  localStorage.setItem('ticTacToeScores', JSON.stringify({
    x: xWins.value,
    o: oWins.value,
    draws: draws.value
  }));
});


onMounted(() => {
  const savedScores = localStorage.getItem('ticTacToeScores');
  if (savedScores) {
    try {
      const scores = JSON.parse(savedScores);
      xWins.value = scores.x || 0;
      oWins.value = scores.o || 0;
      draws.value = scores.draws || 0;
    } catch (e) {
      console.error('Error parsing saved scores', e);
    }
  }
});
</script>


<template>
  <div class="game-container">
    <div class="top-section">
      <button class="back-button" @click="emit('backToMenu')">
        ← Home
      </button>
      
      <GameControls
        :isAiMode="isAiMode"
        :isDarkMode="isDarkMode"
        @restartGame="restartGame"
        @resetScores="resetScores"
        @toggleGameMode="emit('backToMenu')"
        @toggleTheme="toggleTheme"
      />
    </div>

    <div class="game-content">
      <div class="status-section">
        <GameStatus
          :currentPlayer="currentPlayer"
          :winner="winner"
          :isDraw="isDraw"
        />
        
        <ScoreBoard
          :xWins="xWins"
          :oWins="oWins"
          :draws="draws"
        />
      </div>
      
      <Board
        :board="board"
        :winningCombo="winningCombo"
        :gameOver="gameOver"
        :recentlyRemoved="recentlyRemoved"
        @makeMove="makeMove"
      />
    </div>
  </div>
</template>

<style scoped>

.game-container {
  font-family: 'Jersey 15', sans-serif;
  width: 100%;
  max-width: 1200px;
  margin: 0rem auto;
  padding: 17px;
  margin-left: -20px;
  margin-right: -58px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  margin-top: -25px;
  gap: 20px;
}

.back-button {
  padding: 12px 24px;
  /*font-family: Jersey 15, sans-serif;*/
  font-size: 1.3rem;
  font-weight: 600;
  font-style: bold;
  border: dashed 2px;
  border-width: 4px;
  border-radius: 26px;
  background-color: var(--btn-bg-color);
  color: var(--btn-text-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.status-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: -22px;
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .back-button {
    width: 100%;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .game-container {
    padding: 12px;
  }

  .top-section {
    margin-bottom: 16px;
  }

  .game-content {
    gap: 16px;
  }
}
</style>