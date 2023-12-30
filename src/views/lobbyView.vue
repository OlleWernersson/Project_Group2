<template>
  <header>
    <Id-box :id="gameID"></Id-box>
  </header>

<div class = "bigWrapper">
  <div class = "editPlayerWrapper" v-if="!hasJoinedLobby">
    <h2> {{ uiLabels.enterPlayer }} </h2>
    <label>
        <input type="text" v-model="playerName" :placeholder="uiLabels.yourName" @input="handleNameInput" autocomplete="off">
      </label>

      <label class="player-pieces-box">
        <p class="choose-color-text">{{ uiLabels.choosecolor }}</p>
        <div class="player-pieces">
          <div class="player-piece" v-for="(colorObj, index) in playerColorsObjs" :key="index" @click="selectPlayerColor(colorObj)">
            <div class="piece-circle" :style="{ backgroundColor: colorObj.color }"></div>
          </div>
        </div>
      </label>
      <button class = "main-button" @click = "joinLobby"> {{ uiLabels.joinLobby }} </button>
  </div>
  <div class = playerWrapper>
    <h1> {{ uiLabels.waitPlayers }} </h1>
    <PlayerList :players="playerList" />
  </div>
</div>


  <button
    v-if="isHost"
    id="start-game-button"
    class="main-button"
    @click="startGame()"
  >
    {{ uiLabels.startGame }}
</button>

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
      hasJoinedLobby: false,
      isHost: false,

      playerColorsObjs: [],
      selectedColorObj: {},

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
    
    socket.emit("loadColors", this.gameID)
    socket.on("getColors", (colors) => {
      this.playerColorsObjs = colors;
    });


    socket.emit("enterlobby",this.gameID)
    console.log("playerList Updated! nu är vi tillbaks i lobbyview")
    socket.emit("checkIfHost", this.gameID)
    socket.on("isHost", (boolean) => {
      this.hasJoinedLobby = boolean;
      this.isHost = boolean;
    })
    socket.on("navigateToGame", (gameID) => {
      this.$router.push({ path: `/game/${this.gameID}` });
    })
  },
  methods: {
    selectPlayerColor(colorObj) {
      colorObj.isSelected = true;
      this.selectedColorObj = colorObj; 
    },
    joinLobby() {
      this.hasJoinedLobby = true;
      socket.emit('joinLobby', { gameID: this.gameID, playerName: this.playerName, playerColorObj: this.selectedColorObj, isHost: false});
    },
    startGame() {
      socket.emit("startGame", this.gameID)
    }

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
