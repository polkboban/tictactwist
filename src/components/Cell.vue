<script setup lang="ts">
import { computed } from 'vue';
import type { CellValue } from '../types';

interface Props {
  value: CellValue;
  isWinning: boolean;
  disabled: boolean;
}

const props = defineProps<Props>();

const cellClass = computed(() => {
  const classes = ['cell'];
  if (props.value === 'X') classes.push('cell-x');
  if (props.value === 'O') classes.push('cell-o');
  if (props.isWinning) classes.push('winning');
  if (props.disabled && props.value === null) classes.push('disabled');
  return classes;
});
</script>

<template>
  <button
    :class="cellClass"
    :disabled="disabled"
    @click="$emit('click')"
    aria-label="Game cell"
  >
    <span v-if="value === 'X'" class="x-mark">X</span>
    <span v-if="value === 'O'" class="o-mark">O</span>
  </button>
</template>

<style scoped>
.cell {
  aspect-ratio: 1;
  background-color: var(--cell-bg-color);
  border: solid 3px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'monospaced', sans-serif;
  font-size: 6.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.cell:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.cell-x {
  color: var(--x-color);
}

.cell-o {
  color: var(--o-color);
}

.winning {
  background-color: var(--winning-bg-color);
  animation: pulse 1.5s infinite;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.x-mark, .o-mark {
  animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .cell {
    font-size: 3.5rem;
    border-radius: 16px;
  }
}

@media (max-width: 480px) {
  .cell {
    font-size: 2.5rem;
    border-radius: 12px;
  }
}
</style>