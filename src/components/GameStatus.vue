<script setup lang="ts">
import { computed } from 'vue';
import type { CellValue } from '../types';

interface Props {
  currentPlayer: CellValue;
  winner: CellValue;
  isDraw: boolean;
}

const props = defineProps<Props>();

const statusMessage = computed(() => {
  if (props.winner) {
    return `Player ${props.winner} wins!`;
  } else if (props.isDraw) {
    return 'Game ended in a draw!';
  } else {
    return `Player ${props.currentPlayer}'s turn`;
  }
});

const statusClass = computed(() => {
  const classes = ['game-status'];
  if (props.winner === 'X') classes.push('winner-x');
  if (props.winner === 'O') classes.push('winner-o');
  if (props.isDraw) classes.push('draw');
  return classes;
});
</script>

<!--
<template>
  <div :class="statusClass">
    <h2>{{ statusMessage }}</h2>
  </div>
</template>
-->



<style scoped>
.game-status {
  margin: 16px ;
  padding: 14px;
  border-radius: 8px;
  background-color: var(--status-bg-color);
  text-align: center;
  transition: all 0.3s ease;
}

.game-status h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.winner-x {
  background-color: var(--x-win-bg-color);
  color: var(--x-win-text-color);
  animation: celebrate 1s ease-in-out;
}

.winner-o {
  background-color: var(--o-win-bg-color);
  color: var(--o-win-text-color);
  animation: celebrate 1s ease-in-out;
}

.draw {
  background-color: var(--draw-bg-color);
  color: var(--draw-text-color);
}

@keyframes celebrate {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>