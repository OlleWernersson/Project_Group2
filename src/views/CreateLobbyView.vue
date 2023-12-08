<template>
  <header>
    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>
  <main>


  </main>
  <router-link
      id="create-lobby-button"
      class="main-button"
      :to="'/lobby/' + gameID"
      tag="button"
    >
      {{ uiLabels.createLobby }}
    </router-link>
</template>

<script>
import io from 'socket.io-client';
import IdBox from '@/components/id-box.vue';

const socket = io("localhost:3000");

export default {
  name: 'CreateLobbyView',
  components: {
  },
  data: function () {
    return {
      uiLabels: {},
      gameID: "",
      lang: localStorage.getItem("lang") || "en",
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    const randomNumber = Math.floor(Math.random() * 9000 + 1000);
    this.gameID = randomNumber;
  },
  methods: {
  },
};
</script>

<style scoped>
#create-lobby-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>