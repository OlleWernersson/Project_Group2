<template>
  <div class="player-list">
    <div v-for="player in players" :key="player.id" class="player-box">
      {{ player.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array, // Assume players is an array of objects with 'id' and 'name'
  },
};
</script>

<style scoped>
.player-list {
  margin-top: 20px;
}

.player-box {
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
