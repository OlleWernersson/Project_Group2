<template>
  <div class="city-wrapper">
    <div class="city-circle" :style="{ left: cityPosition.x + 'px', top: cityPosition.y + 'px'}">
      <img :src="cityImage" alt="City Circle" class="city-image">
      <p class="city-name">{{ city?.name }}</p>
      
      <div v-if="hasPlayers">
        <div class="player-circles" v-if="city && players.length">
        <div
          v-for="player in filteredPlayers"
          :key="player.id"
          :class="{ 'player-circle': true, 'golden-border': player.name === playerName, 'black-border': player.name !== playerName }"
          :style="{ backgroundColor: player.colorObj.color }"
        ></div>
      </div>
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
    playerName: String,
    hasPlayers: Boolean
  },
  computed: {
    filteredPlayers() {
     return this.players.filter(player => player.name !== 'noPlayerHost');
    },

    cityPosition() {
      if (this.mapSize && this.city) {
        const relativeX = (this.city.left / 800) * this.mapSize.width - this.cityRadius;
        const relativeY = (this.city.top / 760) * this.mapSize.height - this.cityRadius;

        return {
          x: relativeX,
          y: relativeY,
        };
      } else {
        return { x: 0, y: 0 }; 
      }
    },
    cityImage() {
      return '../../public/img/kartnal.png';
    },
  },
  data() {
    return {
      cityRadius:10,
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
}
.city-image {
  width: 40px;
  height: 40px;
  margin-top: -20px;
}

.city-name {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -30px;
  font-size: small;
  background: linear-gradient(-20deg, #e9defa 20%, #ffcbcb 80%);
  border: 1.5px solid #5a082d;
  border-radius: 4px;
  padding-left: 1px;
  padding-right: 1px;
}
.player-circles {
  position: absolute;
  bottom: -3px;
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
.golden-border {
  border: 2px solid white;
}

.black-border {
  border: 1px solid black;
}
</style>


