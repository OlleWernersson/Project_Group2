<template>

    <div v-for="player in players" :key="player.id" class="playerBox" :style="{ backgroundColor: player.color }" >
      {{ player.name }}
    </div>
</template>

<script>
export default {
  props: {
    players: Array,
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
