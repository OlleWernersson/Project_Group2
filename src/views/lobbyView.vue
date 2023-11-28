<template>
  <div class="header-container">
    <div class="header-content">
      <h1>{{ uiLabels.lobby }}</h1>
    </div>
    <div class="id-box">ID: {{ id }}</div>
  </div>
  <player-list :players="playerList" />
  <router-link class="main-button" to="/game/" tag="button">{{ uiLabels.startGame }}</router-link>
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
.header-container {
  text-align: center;
  padding-top: 20px;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: center;
}

h1 {
  margin: 0;
}

.id-box {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

.main-button {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: plum;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
}
</style>
