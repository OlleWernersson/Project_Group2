<template>
  <header>
    <Id-box :id="gameID"></Id-box>
  </header>
  <div class = "editPlayerWrapper">
    <h2> {{ uiLabels.enterPlayer }} </h2>
    <label>
      <input 
      type="text" 
      v-model="playerName" 
      :placeholder="uiLabels.yourName" 
      @input="handleNameInput" 
      :class="{ 'invalid-name': playerNameEmpty, 'name-taken': playerNameTaken, 'valid-name': playerNameValid}"
      autocomplete="off">
    </label>

    <label class="player-pieces-box" :class="{'noColorSelected':!colorIsSelected}">
      <p class="choose-color-text">{{ uiLabels.choosecolor }}</p>
      <div class="player-pieces">
        <div 
        class="player-piece" 
        v-for="(colorObj, index) in playerColorsObjs" 
        :key="index" 
        @click="selectPlayerColor(colorObj)"
        :class="{ 'selected-color': colorObj.isSelected }">

          <div class="piece-circle" :style="{ backgroundColor: colorObj.color }"></div>
        </div>
      </div>
    </label>
    <button class = "main-button" @click = "joinLobby"> {{ uiLabels.joinLobby }} </button>
  </div>
</template>

<script>
import IdBox from '@/components/id-box.vue';

import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'JoinLobbyView',
  components: {IdBox},
  data: function () {
    return {
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",

      colorIsSelected: true,
      gameID:"",
      playerName: "",
      playerNameEmpty: false,
      playerNameTaken: false,
      playerNameValid: false,

      playerColorsObjs: [],
      selectedColorObj: {},
    };
  },
  created: function () {
    this.gameID = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.emit("loadColors", this.gameID)
    socket.on("getColors", (colors) => {
      this.playerColorsObjs = colors;
    });
    socket.on('isNameTaken', (boolean) => {
      this.playerNameTaken = boolean;
      if(this.playerName.length) {
        this.playerNameValid = !boolean;
      }
    })
  },
  methods: {
    handleNameInput() {
      this.playerName = this.playerName.slice(0, 20);
      this.playerNameEmpty = false;
      if(this.playerName === "") {
        this.playerNameValid = false;
      }
      socket.emit('isThisNameTaken',this.gameID,this.playerName)
    },
    selectPlayerColor(colorObj) {
    if (this.selectedColorObj) {
      this.selectedColorObj.isSelected = false;
    }

    colorObj.isSelected = true;
    this.colorIsSelected = true;
    this.selectedColorObj = colorObj;
    },
    joinLobby() {
      if(this.playerName === "") {
        this.playerNameEmpty = true
      }
      if(!this.selectedColorObj.isSelected) {
        this.colorIsSelected = false
      }
      if(!this.playerNameEmpty && this.colorIsSelected && this.playerNameValid) {
        this.hasJoinedLobby = true;
        socket.emit('joinLobby', { gameID: this.gameID, playerName: this.playerName, playerColorObj: this.selectedColorObj, isHost: false});
        this.$router.push({ path: `/lobby/${this.gameID}`, query: { playerName: this.playerName} });
      }
    },
  },
  computed: {
  },
};
</script>

<style scoped>
input {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  width: 300px;
  font-size: 1.5em;
  margin-top: 10px;
  background-color:floralwhite;
  outline: none;
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
  margin-left: 10px;
}

.player-piece {
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid rgb(155, 155, 155);
  border-radius: 50%;
}
.piece-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.selected-color {
  border: 2px solid rgb(88, 234, 59);
  border-radius: 50%;
}
.invalid-name, .name-taken {
  border-color: red;
}
.valid-name {
  border-color: green;
}
.noColorSelected{
  border-color: red;
} 
</style>
