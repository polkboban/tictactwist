<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameBoard from './components/GameBoard.vue';

const gameStarted = ref(false);
const isAiMode = ref(false);
const isMusicPlaying = ref(false);
const audio = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  audio.value = new Audio('/assets/sounds/game-music.mp3');
  if (audio.value) {
    audio.value.loop = true;
    audio.value.volume = 0.5;
  }
});

const toggleMusic = () => {
  if (!audio.value) return;
  if (isMusicPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isMusicPlaying.value = !isMusicPlaying.value;
};

const startGame = (withAI: boolean) => {
  isAiMode.value = withAI;
  gameStarted.value = true;
};
</script>

<template>
  <div class="app-container">
    <button
      class="music-toggle"
      @click="toggleMusic"
      :class="{ 'playing': isMusicPlaying }"
    >
    🎵
    </button>
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

.music-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background-color: var(--btn-bg-color);
  border: none;
  border-radius: 50%;
  font-size: 24px;
  color: var(--btn-text-color);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.music-toggle.playing {
  background-color: var(--playing-bg-color);
  transform: scale(1.1);
}

.music-toggle:hover {
  background-color: var(--hover-bg-color);
  transform: scale(1.05);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .music-toggle {
    width: 40px;
    height: 40px;
    font-size: 20px;
    top: 10px;
    right: 10px; 
  }
}

@media (max-width: 480px) {
  .menu-button {
    padding: 14px 24px;
    font-size: 1.1rem;
  }
}

</style>