<template>
  <main>
    <p>  {{ uiLabels.enterGameID }}  
    </p>

    <label>
      <input type="text" v-model="gameID" :placeholder="uiLabels.gameId" @input="handleGameIDInput" autocomplete="off">
      <router-link
    id="join-lobby-button"
    class="main-button"
    :to="'/lobby/' + gameID"
    tag="button"
    @click="joinLobby"
  >
    {{ uiLabels.joinLobby }}
  </router-link>
    </label>


  </main>
</template>

<script>
import io from 'socket.io-client';

const socket = io("localhost:3000");

export default {
  name: 'GameIDView',
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
  },
  methods: {
    handleGameIDInput() {
      // tar bort icke siffror
      //this.gameID = this.gameID.replace(/\D/g, '');
      // bestämmer hur lång ID är
      this.gameID = this.gameID.slice(0, 4);
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
  font-size: 1em;
}

p {
  font-size: 1.5em;
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
    height: 20px;

}
</style>
