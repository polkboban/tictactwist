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
    const playerMoves = moveHistory.value.filter(move => move.player === currentPlayer.value);
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
  moveHistory.value = [];
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
    <div class="game-content">
      <div class="status-section">
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

    <div class="bottom-controls">
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
  </div>
</template>

<style scoped>
:root {
  --comic-orange-dark: #d95f00;
  --comic-orange-light: #ff8c00;
  --comic-border-color: #333;
  --comic-text-color: #fff;
  --comic-text-shadow-color: #000;
}

.game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 17px;
  box-sizing: border-box; 
}

/* Renamed from .top-section and styles adjusted */
.bottom-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* Added margin to create space above the buttons */
  gap: 20px;
  max-width: 1000px;
}

.back-button {
  padding: 12px 24px;
  font-family: 'Bangers', cursive;
  font-size: 1.3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 4px solid var(--comic-border-color);
  border-radius: 12px;
  color: var(--comic-text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  text-shadow:
    -2px -2px 0 var(--comic-text-shadow-color),
    2px -2px 0 var(--comic-text-shadow-color),
    -2px 2px 0 var(--comic-text-shadow-color),
    2px 2px 0 var(--comic-text-shadow-color);
  
  background-image: linear-gradient(to bottom, var(--comic-orange-light), var(--comic-orange-dark));
  box-shadow: 
    inset 0 -6px 0 rgba(0,0,0,0.3),
    inset 0 6px 0 rgba(255,255,255,0.3),
    0 8px 0 var(--comic-border-color),
    0 10px 15px rgba(0,0,0,0.3);

  position: relative;
  overflow: hidden;
}

.back-button::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.back-button:hover {
  transform: translateY(-4px);
  box-shadow: 
    inset 0 -4px 0 rgba(0,0,0,0.3),
    inset 0 4px 0 rgba(255,255,255,0.3),
    0 12px 0 var(--comic-border-color),
    0 16px 20px rgba(0,0,0,0.4);
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
  /* Renamed from .top-section */
  .bottom-controls {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 0; /* Removed bottom margin from old style */
  }

  .back-button {
    width: 100%;
    max-width: 250px;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}

@media (max-width: 480px) {
  .game-container {
    padding: 12px;
  }

  /* Renamed from .top-section */
  .bottom-controls {
    margin-top: 1.5rem; /* Adjusted top margin for smaller screens */
  }

  .game-content {
    gap: 16px;
  }
}
</style>