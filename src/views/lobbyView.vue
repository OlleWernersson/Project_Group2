<template>
  <header>
    <Id-box :id="gameID"></Id-box>
  </header>

<div class = "bigWrapper">
  <div class = playerWrapper>
    <h1> {{ uiLabels.waitPlayers }} </h1>
    <PlayerList :players="playerList" :lobby = "true" />
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

const socket = io(sessionStorage.getItem("dataServer"));

export default {
  props: {
  initialPlayerName: String, 
},
  name: 'lobbyView',
  components: {
    PlayerList,
    IdBox,
  },
  data: function () {
    return {
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",

      playerName: this.initialPlayerName,
      playerList: {},
      gameID:"",
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
    socket.emit("checkIfHost", this.gameID, this.playerName)
    socket.on("isHost", (boolean) => {
      this.hasJoinedLobby = boolean;
      this.isHost = boolean;
      if(boolean) {
        socket.emit("whatIsHostName",this.gameID)
      }
    })
    socket.on("navigateToGame", (gameID) => {
      if (this.playerName==="noPlayerHost") {
        this.$router.push({ path: `/game/${gameID}`});
        socket.emit("removeNoPlayerHost", this.gameID)
      }
      else {
        this.$router.push({ path: `/game/${gameID}`, query: { playerName: this.playerName} });
      }
    })

    socket.on("hostName", (hostName) => {
      this.playerName = hostName;
    })
  },
  methods: {
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

</style>
