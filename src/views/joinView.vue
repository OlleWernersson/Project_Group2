<template>
  <main>
    <h1>{{ uiLabels.enterGameID }}</h1>
    <label class="wrapper">
      <input
        type="text"
        v-model="gameID"
        :placeholder="uiLabels.gameId"
        @input="handleGameIDInput"
        :class="{ 'invalid-gameID': joinError, 'valid-gameID':valid, 'invalid-lobbyID': invalidLobby }"
        autocomplete="off"
      />

      <button id="join-lobby-button" class="main-button" @click="joinLobby">
        {{ uiLabels.join }}
      </button>
    </label>

    <p v-if="joinError" class="error-message">{{ uiLabels.gameIdErrorMessage }}</p>
    <p v-if="valid" class="valid-message">{{ uiLabels.gameIdValidMessage }}</p>
    <p v-if="invalidLobby" class="invalidLobby-message">{{ uiLabels.gameIdInvalidLobbyMessage }}</p>
  </main>
</template>

<script>
import io from 'socket.io-client';

const socket = io("localhost:3000");

export default {
  name: 'JoinView',
  data: function () {
    return {
      uiLabels: {},
      gameID: "",
      joinError: false,
      lang: localStorage.getItem("lang") || "en",
      valid: false,
      invalidLobby: false
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.on("isGameIDValid", (boolean) => {
      this.valid = boolean;
      this.invalidLobby = !boolean
    });
  },
  methods: {
    handleGameIDInput() {
      // tar bort icke siffror
      this.gameID = this.gameID.replace(/\D/g, '');
      // bestämmer hur lång ID är
      this.gameID = this.gameID.slice(0, 4);
      this.invalidLobby=false
      if (this.gameID.length === 4) {
        this.joinError = false;
        socket.emit("CheckGameID", this.gameID)
      }
      else {
        this.valid = false
      }
      
    },
    joinLobby() {
      if (this.gameID.length !== 4) {
        this.joinError = true;
      } 
      else if(this.valid){
        /* socket.emit('joinLobby', { gameID: this.gameID, playerName: this.playerName }); */
        this.$router.push({ path: `/lobby/${this.gameID}` });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // This is called before entering the route
    // You can access the component instance with `this`
    next(vm => {
      if (vm.gameID.length !== 4) {
        // If the gameID is not valid, prevent entering the route
        next(false);
      }
    });
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
  height: 42px;
  font-size: 1.5em;
  margin-top: 10px;
  background-color:floralwhite;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
}
input:focus {
  background-color: white;
}
input.invalid-gameID {
  border-color: red;
}
input.invalid-lobbyID {
  border-color: red;
}
input.valid-gameID {
  border-color: green;
}
.wrapper {
  display: flex; 
  flex-direction: row;
}
.error-message {
  color: red;
  position: absolute;
  margin-left: -50px;
}
.valid-message {
  color: green;
  position: absolute;
  margin-left: -50px;
}
.invalidLobby-message{
  color: red;
  position: absolute;
  margin-left: -50px;
}
@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.2em;
  }
  .error-message, .valid-message, .invalidLobby-message {
    margin-top: -20px;
  }

}
@media screen and (max-width: 500px) {
  h1 {
    font-size: 0.8em;
  }
  .error-message, .valid-message, .invalidLobby-message {
    margin-top: -20px;
    font-size: 0.8em;
    margin-left: -80px;
  }
  input {
  width: 200px;
  height: 30px;
  font-size: 1em;
}
.main-button {
  font-size: 1em;
}


}

</style>
