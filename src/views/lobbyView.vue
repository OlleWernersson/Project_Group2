<template>
  <header>
    <h1>{{ uiLabels.lobby }}</h1>
    <div class="id-box">ID: {{ id }}</div>
  </header>

  <player-list :players="playerList" />
  <router-link id="start-game-button" class="main-button" to="/game/" tag="button">{{ uiLabels.startGame }}</router-link>
</template>

<script>
import io from 'socket.io-client';
import PlayerList from '@/components/PlayerList.vue';

const socket = io("localhost:3000");

export default {
  name: 'LobbyView',
  components: {
    PlayerList,
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en",
      playerList: [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
      ],
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("updatePlayerList", (players) => {
      this.playerList = players;
    });
  },
  methods: {},
};
</script>

<style scoped>
h1 {
  margin-top: 20px;
}

.id-box {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 10px;
  border: 2px solid #ccc;
}

#start-game-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
