<script setup lang="ts">
const emit = defineEmits<{
  restartGame: [];
  resetScores: [];
  toggleGameMode: [];
  toggleTheme: [];
}>();

interface Props {
  isAiMode: boolean;
  isDarkMode: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="game-controls">
    <button class="control-btn restart" @click="emit('restartGame')">
      Restart Game
    </button>
    <button class="control-btn reset" @click="emit('resetScores')">
      Reset Scores
    </button>
    <button class="control-btn theme" @click="emit('toggleTheme')">
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </div>
</template>

<style scoped>
.game-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--btn-text-color);
  white-space: nowrap;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.restart {
  background-color: var(--restart-btn-color);
}

.reset {
  background-color: var(--reset-btn-color);
}

.theme {
  background-color: var(--theme-btn-color);
}

@media (max-width: 768px) {
  .game-controls {
    width: 100%;
    justify-content: center;
  }

  .control-btn {
    flex: 1;
    padding: 10px 16px;
    font-size: 1rem;
    min-width: 120px;
  }
}

@media (max-width: 480px) {
  .control-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
    min-width: 100px;
  }
}
</style>