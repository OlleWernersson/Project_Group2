<template>
  <header>
    <h1>{{ uiLabels.lobby }}</h1>
    <Id-box :id="id"></Id-box>
  </header>

  <player-list :players="playerList" />
  <router-link
      id="start-game-button"
      class="main-button"
      :to="'/game/' + id"
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
  name: 'LobbyView',
  components: {
    PlayerList,
    IdBox,
  },
  props: ['id'],
  data: function () {
    return {
      uiLabels: {},
      lobbyID: "",
      lang: localStorage.getItem("lang") || "en",
      playerList: [],
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
#start-game-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
