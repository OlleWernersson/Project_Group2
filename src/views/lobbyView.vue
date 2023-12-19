<template>
  <header>
    <h1>{{ uiLabels.lobby }}</h1>
    <Id-box :id="gameID"></Id-box>
  </header>

  <player-list :players="playerList" />
  {{ playerList }}
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
      gameID:""
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
      
      console.log(this.playerList)
    });
    console.log("playerList Updated! nu är vi tillbaks i lobbyview")
  },
  methods: {},
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
</style>
