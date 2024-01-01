<template>
  <div class="city-wrapper">
    <div class="city-circle" :style="{ left: city?.left + 'px', top: city?.top + 'px'}">
      <p class="city-name">{{ city?.name }}</p>
      <div class="player-circles" v-if="city && players.length">
        <div v-for="player in players" :key="player.id" class="player-circle" :style="{ backgroundColor: player.colorObj.color }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: Object,
    players: Array,
  },
  data() {
    return {

    };
  },
  methods: {

  },
}
</script>

<style>
.city-wrapper {
  position: relative;
}

.city-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: aqua;
  border-radius: 50%;
}

.city-name {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -20px;
  font-size: small;

}
.player-circles {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.player-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>


