<template>
  <div class="city-wrapper">
    <div class="city-circle" :style="{ left: cityPosition.x + 'px', top: cityPosition.y + 'px'}">
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
    mapSize: Object,
  },
  computed: {
    cityPosition() {
      if (this.mapSize && this.city) {
        // Calculate relative position based on map size
        const relativeX = (this.city.left / 800) * this.mapSize.width;
        const relativeY = (this.city.top / 760) * this.mapSize.height;

        return {
          x: relativeX,
          y: relativeY,
        };
      } else {
        return { x: 0, y: 0 }; // or any default values if needed
      }
    },
  },
  data() {
    return {
    };
  },
  methods: {

  },
}
</script>

<style scoped>
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


