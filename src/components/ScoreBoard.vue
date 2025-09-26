<script setup lang="ts">
interface Props {
  xWins: number;
  oWins: number;
  draws: number;
}

defineProps<Props>();
</script>

<template>
  <div class="score-board">
    <div class="score x-score">
      <span class="label">PLAYER 1 (X)</span>
      <span class="count">{{ xWins }}</span>
    </div>
  
    

    <div class="score o-score">
      <span class="label">PLAYER 2 (O)</span>
      <span class="count">{{ oWins }}</span>
    </div>
  </div>
</template>

<style scoped>
:root {
  --comic-red-dark: #cc0000;
  --comic-red-light: #ff3333;
  --comic-blue-dark: #0066cc;
  --comic-blue-light: #3399ff;
  --comic-yellow-dark: #e6a000;
  --comic-yellow-light: #ffcc00;
  --comic-border-color: #333;
  --comic-text-color: #fff;
  --comic-text-shadow-color: #000;
}

.score-board {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 20px auto;
  flex-wrap: wrap;
}

.score {
  font-family: 'Bangers', cursive;
  color: var(--comic-text-color);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 4px solid var(--comic-border-color);
  text-align: center;
  min-width: 140px;
  box-sizing: border-box;

  box-shadow: 
    inset 0 -6px 0 rgba(0, 0, 0, 0.3),
    inset 0 6px 0 rgba(255,255,255,0.3),
    0 8px 0 var(--comic-border-color),
    0 12px 16px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  transition: transform 0.2s, box-shadow 0.2s;
}

.score:hover {
  transform: translateY(-6px);
  box-shadow: 
    inset 0 -6px 0 rgba(0, 0, 0, 0.3),
    inset 0 6px 0 rgba(255,255,255,0.3),
    0 10px 0 var(--comic-border-color),
    0 16px 20px rgba(0, 0, 0, 0.3),
    0 6px 10px rgba(0, 0, 0, 0.2);
}

.label, .count {
  text-shadow:
    -2px -2px 0 var(--comic-text-shadow-color),
    2px -2px 0 var(--comic-text-shadow-color),
    -2px 2px 0 var(--comic-text-shadow-color),
    2px 2px 0 var(--comic-text-shadow-color);
}

.label {
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 1.2;
}

.count {
  font-size: 2.5rem;
  line-height: 1.1;
}

.x-score {
  background-image: linear-gradient(to bottom, var(--comic-blue-light), var(--comic-blue-dark));
}

.draw-score {
  background-image: linear-gradient(to bottom, var(--comic-yellow-light), var(--comic-yellow-dark));
}

.o-score {
  background-image: linear-gradient(to bottom, var(--comic-red-light), var(--comic-red-dark));
}
</style>