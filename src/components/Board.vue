<script setup lang="ts">
//import { computed } from 'vue';
import Cell from './Cell.vue';
import type { CellValue, WinningCombination } from '../types';

interface Props {
  board: CellValue[][];
  winningCombo: WinningCombination | null;
  gameOver: boolean;
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
        :disabled="gameOver || cell !== null"
        @click="handleCellClick(rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<style scoped>
.game-board {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  max-width: 570px;
  aspect-ratio: 1;
  margin: 1px 50px 10px 10px;
  gap: 16px;
  padding: 16px;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
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