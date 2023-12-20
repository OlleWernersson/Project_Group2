<template>
  <main>
    <label>
      <input type="text" v-model="playerName" placeholder="Your Name" @input="handleNameInput" autocomplete="off">
    </label>

    <label>
      <input type="text" v-model="gameID" :placeholder="uiLabels.gameId" @input="handleGameIDInput" autocomplete="off">
    </label>

    <label class="player-pieces-box">
      <p class="choose-color-text">{{ uiLabels.choosecolor }}</p>
      <div class="player-pieces">
        <div class="player-piece" v-for="(color, index) in playerColors" :key="index" @click="selectPlayerPiece(color)">
          <div class="piece-circle" :style="{ backgroundColor: color }"></div>
        </div>
      </div>
    </label>

  </main>
  <router-link
    id="join-lobby-button"
    class="main-button"
    :to="'/lobby/' + gameID"
    tag="button"
    @click="joinLobby"
  >
    {{ uiLabels.joinLobby }}
  </router-link>

</template>

<script>
import io from 'socket.io-client';

const socket = io("localhost:3000");

export default {
  name: 'JoinView',
  data: function () {
    return {
      uiLabels: {},
      playerName: "",
      gameID: "",
      lang: localStorage.getItem("lang") || "en",
      playerColors: ["#e84a5f", "#3baea0", "#085f63", "#facf5a", "#ff8b00", "#ff847c", "#7481cf"],
      selectedPlayerPiece: null,
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
    handleGameIDInput() {
      // tar bort icke siffror
      //this.gameID = this.gameID.replace(/\D/g, '');
      // bestämmer hur lång ID är
     // this.gameID = this.gameID.slice(0, 4);
    },
    handleNameInput() {
      // Om vi vill ha en limit på spelarnamn
      this.playerName = this.playerName.slice(0,20)
    },
    selectPlayerPiece(color) {
    // Hanterar valet av spelpjäs
      this.selectedPlayerPiece = color; 
    },
    joinLobby() {
      socket.emit('joinLobby', { gameID: this.gameID, playerName: this.playerName });
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Utan denna så kan man klicka på input bredvid var det faktiskt är */
  height: 100vh;
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

#join-lobby-button {
  position: absolute;
  bottom: 0;
  right: 0;
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
