<template>
        <div v-if="result === true">

            <div v-for="(player, index ) in players" :key="player.id" class = "playerWrapper" >
              <label :class="getPlayerColorClass(index + 1)"> {{ index + 1 }}. </label>
              <div class="playerBox" :style="{ backgroundColor: player.colorObj.color }" > 
                <label>{{ player.name }}, </label>
              </div>
          </div>
        </div>

        <div v-if = "lobby === true">
          <div v-for="player in players" :key="player.id" class="playerBox" :style="{ backgroundColor: player.colorObj.color }" >
          <label>{{ player.name }}</label>, 
          <label> Is host: {{ player.isHost }}</label>
          </div>
        </div>
</template>

<script>
export default {
  props: {
    players: Object,
    lobby: false,
    result: false, 
    cities: [],
  },
  methods: {
    getPlayerColorClass(place) {
      switch (place) {
        case 1:
          return 'golden-color';
        case 2:
          return 'silver-color';
        case 3:
          return 'bronze-color';
        default:
          return 'default-color';
      }
    }
  },
};
</script>

<style scoped>
.playerWrapper {
  display: flex;
  align-items: center;
  margin: 10px;
}
.playerBox {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 30px;
  width: 300px;
  font-size: 1.5em;
  margin: 10px;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);

}

.numberBox {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 100%;
  font-size: 1.5em;
  background-color: #ffd700;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);

}

.golden-color {
  background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728);
  padding: 10px;
  border: 2px solid pink;
  border-radius: 100%;
  font-size: 1.5em;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);
}

.silver-color {
  background: linear-gradient(to right, #bcbcbc, #d9d9d9, #efefef);
  padding: 10px;
  border: 2px solid pink;
  border-radius: 100%;
  font-size: 1.5em;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);
}

.bronze-color {
  background-color: brown;
  padding: 10px;
  border: 2px solid pink;
  border-radius: 100%;
  font-size: 1.5em;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);
}

.default-color {
  background-color: rgb(223, 245, 220);
  padding: 10px;
  border: 2px solid pink;
  border-radius: 100%;
  font-size: 1.5em;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  box-shadow: -12px 10px 20px rgba(0, 0, 0, 0.1);

}

</style>
