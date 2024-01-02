<template>
    <div v-for="player in players" :key="player.id" class="playerBox" :style="{ backgroundColor: player.colorObj.color }" >
      <label>{{ player.name }}</label>, 
      <label v-if="lobby"> Is host: {{ player.isHost }}</label>
      <label v-if="result">cities finished: {{ player.city }}
      </label>
    </div>
</template>

<script>
export default {
  props: {
    players: Object,
    lobby: false,
    result: false, 
  },
};
</script>

<style scoped>
.playerBox {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 30px;
  width: 300px;
  font-size: 1.5em;
  margin-top: 10px;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/

}

</style>
