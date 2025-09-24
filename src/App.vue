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
    🎵
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
/* Define new CSS variables for easier color management */
:root {
  --comic-red-dark: #cc0000;
  --comic-red-light: #ff3333;
  --comic-orange-dark: #cc6600;
  --comic-orange-light: #ffcc00;
  --comic-yellow-dark: #e6a000;
  --comic-yellow-light: #ffcc00;
  --comic-border-color: #333; /* Darker border */
  --comic-text-color: #fff; /* White text for contrast */
  --comic-text-shadow-color: #000;
}


.menu-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  max-width: 600px; /* Increased max-width to give buttons more space */
  margin: 0 auto;
  justify-content: center; /* Center buttons horizontally */
}

.app-logo {
  display: block;
  max-width: 900px;
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
  font-weight: 800; /* Bolder text */
  font-family: 'Bangers', cursive; /* A more comic-style font */
  text-transform: uppercase; /* All caps for comic style */
  letter-spacing: 1px; /* Slight letter spacing */
  
  border: 4px solid var(--comic-border-color); /* Solid dark border */
  border-radius: 12px; /* Keep rounded corners */
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--comic-text-color); /* White text */
  text-shadow: 
    -2px -2px 0 var(--comic-text-shadow-color),  
    2px -2px 0 var(--comic-text-shadow-color),
    -2px 2px 0 var(--comic-text-shadow-color),
    2px 2px 0 var(--comic-text-shadow-color); /* Outline text */

  /* Comic book style shadows and background */
  box-shadow: 
    inset 0 -6px 0 rgba(0,0,0,0.3), /* Inner bottom shadow */
    inset 0 6px 0 rgba(255,255,255,0.3), /* Inner top highlight */
    0 8px 0 var(--comic-border-color), /* Bottom "pop" shadow */
    0 10px 15px rgba(0,0,0,0.3); /* Overall drop shadow */
  
  /* Gradient background for depth */
  background-image: linear-gradient(to bottom, var(--button-light-color) 0%, var(--button-dark-color) 100%);
  position: relative; /* Needed for pseudo-elements for halftone */
  overflow: hidden; /* Ensure halftone pattern is clipped */
}

/* Halftone pattern effect */
.menu-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px);
  background-size: 8px 8px; /* Adjust dot size and spacing */
  opacity: 0.5; /* Adjust intensity */
  pointer-events: none; /* Allow clicks to pass through */
  mix-blend-mode: multiply; /* Blend with background color */
}


.menu-button:hover {
  transform: translateY(-4px); /* Lift more on hover */
  box-shadow: 
    inset 0 -4px 0 rgba(0,0,0,0.3),
    inset 0 4px 0 rgba(255,255,255,0.3),
    0 12px 0 var(--comic-border-color), /* Deeper bottom shadow */
    0 16px 20px rgba(0,0,0,0.4); /* Stronger drop shadow */
}

/* Specific colors for friend mode (red) and AI mode (blue) */
.friend-mode {
  --button-dark-color: var(--comic-red-dark);
  --button-light-color: var(--comic-red-light);
}

.ai-mode {
  --button-dark-color: var(--comic-orange-dark);
  --button-light-color: var(--comic-orange-light);
}

.music-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px dashed #000;
  background-color: var(--btn-bg-color);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  z-index: 10;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease;
}
.music-toggle.playing {
  background-color: #f6f6f6;
  transform: scale(1.03);
}

.music-toggle:hover {
  background-color: #fff9e6;
  transform: scale(1.02);
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
  .menu-container {
    flex-direction: column; /* Stack buttons vertically on smaller screens */
    max-width: 250px;
  }
  .menu-button {
    width: 100%; /* Make buttons full width */
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