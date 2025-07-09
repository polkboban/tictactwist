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
      <span class="player">X</span>
      <span class="count">{{ xWins }}</span>
    </div>
    <div class="score draw-score">
      <span class="player">Draws</span>
      <span class="count">{{ draws }}</span>
    </div>
    <div class="score o-score">
      <span class="player">O</span>
      <span class="count">{{ oWins }}</span>
    </div>
  </div>
</template>

<style scoped>
.score-board {
  display: flex;
  justify-content: space-between;
  max-width: 350px;
  margin: 19px 64px 14px 180px;
  gap: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif, sans-serif;
}

.score {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: solid 1px;
  border-radius: 18px;
  background-color: var(--score-bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.score:hover {
  transform: translateY(-2px);
}

.x-score {
  color: var(--x-color);
  border-bottom: 4px solid var(--x-color);
}

.o-score {
  color: var(--o-color);
  border-bottom: 4px solid var(--o-color);
}

.draw-score {
  color: var(--text-color);
  border-bottom: 4px solid var(--draw-color);
}

.player {
  font-size: 1.55rem;
  font-weight: 600;
}

.count {
  font-size: 2.35rem;
  font-weight: 700;
}
</style>