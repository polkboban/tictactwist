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

defineProps<Props>();
</script>

<template>
  <div class="game-controls">
    <button class="control-btn restart-btn" @click="emit('restartGame')">
      Restart Game
    </button>
    <button class="control-btn reset-btn" @click="emit('resetScores')">
      Reset Scores
    </button>
  </div>
</template>

<style scoped>
:root {
  --comic-yellow-dark: #e6a000;
  --comic-yellow-light: #ffcc00;
  --comic-green-dark: #009624;
  --comic-green-light: #00c853;
  --comic-border-color: #333;
  --comic-text-color: #fff;
  --comic-text-shadow-color: #000;
}

.game-controls {
  display: flex;
  gap: 18px; 
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.control-btn {
  padding: 12px 20px;
  font-family: 'Bangers', cursive; 
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 4px solid var(--comic-border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--comic-text-color);
  white-space: nowrap;
  flex: 1 1 auto;
  min-width: 150px;
  margin-right: 0; 

  text-shadow:
    -2px -2px 0 var(--comic-text-shadow-color),
    2px -2px 0 var(--comic-text-shadow-color),
    -2px 2px 0 var(--comic-text-shadow-color),
    2px 2px 0 var(--comic-text-shadow-color);

  box-shadow:
    inset 0 -6px 0 rgba(0,0,0,0.3),
    inset 0 6px 0 rgba(255,255,255,0.3),
    0 8px 0 var(--comic-border-color),
    0 10px 15px rgba(0,0,0,0.3);

  background-image: linear-gradient(to bottom, var(--button-light-color) 0%, var(--button-dark-color) 100%);
  position: relative;
  overflow: hidden;
}

.control-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.control-btn:hover {
  transform: translateY(-4px);
  box-shadow:
    inset 0 -4px 0 rgba(0,0,0,0.3),
    inset 0 4px 0 rgba(255,255,255,0.3),
    0 12px 0 var(--comic-border-color),
    0 16px 20px rgba(0,0,0,0.4);
}

.restart-btn { 
  --button-dark-color: var(--comic-green-dark);
  --button-light-color: var(--comic-green-light);
}

.reset-btn { 
  --button-dark-color: var(--comic-yellow-dark);
  --button-light-color: var(--comic-yellow-light);
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