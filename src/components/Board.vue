<script setup lang="ts">
//import { computed } from 'vue';
import Cell from './Cell.vue';
import type { CellValue, WinningCombination } from '../types';

interface Props {
  board: CellValue[][];
  winningCombo: WinningCombination | null;
  gameOver: boolean;
  recentlyRemoved: { row: number; col: number } | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  makeMove: [row: number, col: number];
}>();

const handleCellClick = (row: number, col: number) => {
  if (!props.gameOver && props.board[row][col] === null) {
    emit('makeMove', row, col);
  }
};

const isWinningCell = (row: number, col: number) => {
  if (!props.winningCombo) return false;
  return props.winningCombo.some(([r, c]) => r === row && c === col);
};
</script>

<template>
  <div class="game-board">
    <div v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`" class="board-row">
      <Cell
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}`"
        :value="cell"
        :isWinning="isWinningCell(rowIndex, colIndex)"
        :isRemoved="recentlyRemoved?.row === rowIndex && recentlyRemoved?.col === colIndex"
        :disabled="gameOver || cell !== null"
        @click="handleCellClick(rowIndex, colIndex)"
      />
    </div>
    
  </div>
</template>

<style scoped>
.winning-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}
.game-board {
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  aspect-ratio: 1;
  max-width: 400px;
  background: #fff;
  border: 5px solid #000;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 10px 10px 0px #000; /* thick shadow offset */
  gap: 16px;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}


@media (max-width: 768px) {
  .game-board {
    max-width: 400px;
    padding: 12px;
    gap: 12px;
  }

  .board-row {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .game-board {
    padding: 8px;
    gap: 8px;
  }

  .board-row {
    gap: 8px;
  }
}
</style>