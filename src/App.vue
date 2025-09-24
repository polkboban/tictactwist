<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GameBoard from './components/GameBoard.vue';

const gameStarted = ref(false);
const isAiMode = ref(false);
const isMusicPlaying = ref(false);
const audio = ref<HTMLAudioElement | null>(null);

onMounted(() => {
  audio.value = new Audio('/audio/bgm.mp3');
  if (audio.value) {
    audio.value.loop = true;
    audio.value.volume = 0.2;
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
  <button
      class="music-toggle"
      @click="toggleMusic"
      :class="{ 'playing': isMusicPlaying }"
    >
    ♫
    </button>
  <div class="app-container">
    
    <template v-if="!gameStarted">
      <img src="/tttlogo4.png" alt="TIC-TAC-TOE" class="app-logo">
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
:root {
  --comic-red-dark: #cc0000;
  --comic-red-light: #ff3333;
  --comic-blue-dark: #0066cc;
  --comic-blue-light: #3399ff;
  --comic-yellow-dark: #e6a000;
  --comic-yellow-light: #ffcc00;
  --comic-green-dark: #009624;
  --comic-green-light: #00c853;
  --comic-border-color: #333;
  --comic-text-color: #fff;
  --comic-text-shadow-color: #000;
}

.menu-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  justify-content: center;
  margin-bottom: 40px;
}

.app-logo {
  display: block;
  margin-top: -10rem;
  max-width: 1000px;
  min-width: 500px;
  width: 80%;
  margin: 0 auto -4rem auto;
  user-select: none;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.app-logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
}

.menu-button {
  padding: 16px 32px;
  font-size: 1.50rem;
  font-weight: 800;
  align-items: center;
  font-family: 'Bangers', cursive;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  border: 4px solid var(--comic-border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--comic-text-color);
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

.menu-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.menu-button:hover {
  transform: translateY(-4px);
  box-shadow: 
    inset 0 -4px 0 rgba(0,0,0,0.3),
    inset 0 4px 0 rgba(255,255,255,0.3),
    0 12px 0 var(--comic-border-color),
    0 16px 20px rgba(0,0,0,0.4);
}

.friend-mode {
  --button-dark-color: var(--comic-red-dark);
  --button-light-color: var(--comic-red-light);
}

.ai-mode {
  --button-dark-color: var(--comic-blue-dark);
  --button-light-color: var(--comic-blue-light);
}

.music-toggle {
  position: fixed;  
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid var(--comic-border-color);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  z-index: 10;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  background-image: linear-gradient(to bottom, var(--comic-red-light), var(--comic-red-dark));
  box-shadow: 
    inset 0 -4px 0 rgba(0,0,0,0.3),
    inset 0 4px 0 rgba(255,255,255,0.3),
    0 5px 0 var(--comic-border-color),
    0 8px 10px rgba(0,0,0,0.3);
  
  overflow: hidden;
}

.music-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px);
  background-size: 6px 6px; 
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.music-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 
    inset 0 -3px 0 rgba(0,0,0,0.3),
    inset 0 3px 0 rgba(255,255,255,0.3),
    0 7px 0 var(--comic-border-color),
    0 10px 15px rgba(0,0,0,0.4);
}

.music-toggle.playing {
  transform: translateY(2px);
  box-shadow: 
    inset 0 4px 0 rgba(0,0,0,0.3), 
    0 3px 0 var(--comic-border-color),
    0 4px 6px rgba(0,0,0,0.4);
  
  background-image: linear-gradient(to bottom, var(--comic-green-light), var(--comic-green-dark));
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .menu-container {
    flex-direction: column;
    max-width: 250px;
  }
  .menu-button {
    width: 100%;
  }
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