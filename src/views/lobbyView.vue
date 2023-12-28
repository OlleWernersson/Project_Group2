<template>
  <header>
    <Id-box :id="gameID"></Id-box>
  </header>

<div class = "bigWrapper">
  <div class = "editPlayerWrapper">
    <h2> {{ uiLabels.enterPlayer }} </h2>
    <label>
        <input type="text" v-model="playerName" placeholder="Your Name" @input="handleNameInput" autocomplete="off">
      </label>

      <label class="player-pieces-box">
        <p class="choose-color-text">{{ uiLabels.choosecolor }}</p>
        <div class="player-pieces">
          <div class="player-piece" v-for="(color, index) in playerColors" :key="index" @click="selectPlayerColor(color)">
            <div class="piece-circle" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
      </label>
      <button class = "main-button" @click = "joinLobby"> Submit </button>
  </div>
  <div class = playerWrapper>
    <h1> {{ uiLabels.waitPlayers }} </h1>
    <PlayerList :players="playerList" />
  </div>
</div>


  <router-link
    id="start-game-button"
    class="main-button"
    :to="'/game/' + gameID"
    tag="button"
  >
    {{ uiLabels.startGame }}
  </router-link>

</template>

<script>
import io from 'socket.io-client';
import PlayerList from '@/components/PlayerList.vue';
import IdBox from '@/components/id-box.vue';

const socket = io("localhost:3000");

export default {
  name: 'lobbyView',
  components: {
    PlayerList,
    IdBox,
  },
  data: function () {
    return {
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",

      playerList: {},
      gameID:"",
      playerName: "",

      playerColors: ["#e84a5f", "#3baea0", "#085f63", "#facf5a", "#ff8b00", "#ff847c", "#7481cf"],
      selectedPlayerColor: "#e84a5f",

    };
  },
  created: function () {
    this.gameID = this.$route.params.id
    console.log(this.gameID)
    socket.emit("joinPoll", this.gameID)
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    
    socket.on("updatePlayerList", (players) => {
      this.playerList = players;
    });
    socket.emit("enterlobby",this.gameID)
    console.log("playerList Updated! nu är vi tillbaks i lobbyview")
  },
  methods: {
    joinLobby() {
      socket.emit('joinLobby', { gameID: this.gameID, playerName: this.playerName, playerColor: this.selectedPlayerColor});
    },
    selectPlayerColor(color) {
    // Hanterar valet av spelpjäs
      this.selectedPlayerColor = color; 
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
}

#start-game-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
.bigWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50%;
}
input {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  width: 300px;
  font-size: 1.5em;
  margin-top: 10px;
  background-color:floralwhite;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
}

input:focus {
  background-color: white;
}
.editPlayerWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.player-pieces-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  width: 300px;
  font-size: 1.5em;
  margin-top: 10px;
  background-color:floralwhite;
  outline: none; 
}

.choose-color-text {
  color: rgb(164, 161, 161);
}
.player-pieces {
  display: flex;
  margin-top: 2px;
  margin-bottom: 20px;
}

.player-piece {
  margin-right: 10px;
  cursor: pointer;
}

.piece-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
