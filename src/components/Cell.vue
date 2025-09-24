<script setup lang="ts">
import { computed } from 'vue';
import type { CellValue } from '../types';

interface Props {
  value: CellValue;
  isWinning: boolean;
  disabled: boolean;
  isRemoved: boolean;
}

const props = defineProps<Props>();

const cellClass = computed(() => {
  const classes = ['cell'];
  if (props.value === 'X') classes.push('cell-x');
  if (props.value === 'O') classes.push('cell-o');
  if (props.isWinning) classes.push('winning');
  if (props.disabled && props.value === null) classes.push('disabled');
  if (props.isRemoved) classes.push('removed');
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
  background-color: #3f3f3f5d;
  border: 3px solid #000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Arial Black', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cell:hover:not(.disabled) {
  transform: scale(1.05);
}

.x-mark {
  color: #facc15; /* yellow */
  -webkit-text-stroke: 3px #000; /* black outline */
  text-shadow: #000 2px 2px 0, #000 -2px -2px 0;
}

.o-mark {
  color: #fa2815;
  -webkit-text-stroke: 3px #000;
  text-shadow: #000 2px 2px 0, #000 -2px -2px 0;
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

.removed {
  animation: fadeOut 0.5s ease-out;
  background-color: rgba(255, 0, 0, 0.25);  
}

@keyframes fadeOut {
  from {
    background-color: rgba(255, 0, 0, 0.4);
  }
  to {
    background-color: var(--cell-bg-color);
  }
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