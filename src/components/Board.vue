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
    <!-- Winning line overlay -->
    <svg
      v-if="winningCombo"
      class="winning-line"
      viewBox="0 0 3 3"
      preserveAspectRatio="none"
    >
      <line
        :x1="winningCombo[0][1] + 0.5"
        :y1="winningCombo[0][0] + 0.5"
        :x2="winningCombo[2][1] + 0.5"
        :y2="winningCombo[2][0] + 0.5"
        stroke="#22d3ee"
        stroke-width="0.15"
        stroke-linecap="round"
      >
        <animate attributeName="x2" :from="winningCombo[0][1] + 0.5" :to="winningCombo[2][1] + 0.5" dur="0.4s" fill="freeze"/>
        <animate attributeName="y2" :from="winningCombo[0][0] + 0.5" :to="winningCombo[2][0] + 0.5" dur="0.4s" fill="freeze"/>
      </line>
    </svg>
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
  position: relative; /* Add this so the SVG overlays correctly */
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  max-width: 530px;
  aspect-ratio: 1;
  margin: 0px 50px -50px 10px;
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