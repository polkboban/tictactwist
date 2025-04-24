<script setup lang="ts">
import { ref } from 'vue';
import GameBoard from './components/GameBoard.vue';

const gameStarted = ref(false);
const isAiMode = ref(false);

const startGame = (withAI: boolean) => {
  isAiMode.value = withAI;
  gameStarted.value = true;
};
</script>

<template>
  <div class="app-container">
    <template v-if="!gameStarted">
      <h1 class="app-title">Tic Tac Toe</h1>
      <div class="menu-container">
        <button 
          class="menu-button friend-mode"
          @click="startGame(false)"
        >
          Play with Friend
        </button>
        <button 
          class="menu-button ai-mode"
          @click="startGame(true)"
        >
          Play Alone
        </button>
      </div>
    </template>
    
    <GameBoard 
      v-else
      :isAiMode="isAiMode"
      @back-to-menu="gameStarted = false"
    />
  </div>
</template>

<style>
.menu-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.menu-button {
  padding: 16px 32px;
  font-size: 1.50rem;
  font-weight: 600;
  font-family: 'Jersey 15', sans-serif;
  border: 2px dashed;
  border-width: 4px;
  background-color: var(rgba(236, 15, 15, 0.8));
  box-shadow: 0 10px 14px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--btn-text-color);
}

.menu-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.friend-mode {
  background-color: var(--restart-btn-color);
}

.ai-mode {
  background-color: var(--mode-btn-color);
}

@media (max-width: 480px) {
  .menu-button {
    padding: 14px 24px;
    font-size: 1.1rem;
  }
}
</style>