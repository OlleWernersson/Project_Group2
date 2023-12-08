<template>
  <header>
    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>
  <Id-box :id="id"></Id-box> 
  <main>


  </main>
</template>

<script>
import io from 'socket.io-client';
import IdBox from '@/components/id-box.vue';

const socket = io("localhost:3000");

export default {
  name: 'CreateLobbyView',
  components: {
    IdBox,
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

</style>