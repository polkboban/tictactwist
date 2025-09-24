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
    <!-- Player X -->
    <div class="score x-score">
      <span class="symbol x">X</span>
      <span class="label">PLAYER 1</span>
      <span class="count">{{ xWins }}</span>
    </div>

    <!-- Draws -->
    <div class="score draw-score">
      <span class="symbol draw">ツ</span>
      <span class="label">DRAWS</span>
      <span class="count">{{ draws }}</span>
    </div>

    <!-- Player O -->
    <div class="score o-score">
      <span class="symbol o">O</span>
      <span class="label">PLAYER 2</span>
      <span class="count">{{ oWins }}</span>
    </div>
  </div>
</template>

<style scoped>
.score-board {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 20px auto;
  font-family: 'Arial Black', sans-serif;
}

.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.symbol {
  font-size: 2.5rem;
  color: #facc15; /* yellow */
  -webkit-text-stroke: 3px #000; /* thick black outline */
  margin-bottom: 0.3rem;
}

.label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0.4rem;
}

.count {
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
}

.draw-score .symbol {
  color: #6b7280; /* gray for draws */
  -webkit-text-stroke: 2px #000;
}
</style>
