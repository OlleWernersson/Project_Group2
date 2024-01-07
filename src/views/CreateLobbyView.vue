<template>
  <div v-if="helpOpen">
        <div class="popup" @click.self = "help2()">
          <div class="helpText">
             <p> {{ uiLabels.createLobbyHelp }}</p> 
          </div>
        </div>
      </div>


  <header>
    <button class="supportButtons" @click="help2()"> {{ uiLabels.help }}</button>

    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>

  <main>
    <section class="Choose-Route">
      <h2 :class="{'noRouteSelected': !routeIsSelected}">
        {{uiLabels.chooseRoute}}
      </h2>
      <div :class="{'noRouteSelectedBorder': !routeIsSelected}">
        <div class="button-grid">
          <button
            v-for="buttonId in 3"
            :key="buttonId"
            class="route-button"
            @click="selectRoute(buttonId)"
            :class="{ 'selected': selectedRoute === buttonId }"
          >
          
          <img
            :src="images[buttonId - 1]"
            alt="Route Image"
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"
            />
          </button>
        </div>
      </div>
    </section>

    <div v-if="!selectedRoute" class="orMessage">
      <h2>{{ uiLabels.orMessage }}</h2>
    </div>

    <section 
    class="Create-Route"
    v-if="!selectedRoute">
      <h2>
        {{uiLabels.createNewRoute}}
      </h2>
      <router-link
        id="create-route-button"
        class="create-route-button"
        :to="'/route/'"
        tag="button"
      >
        +
      </router-link>
    </section>

  </main>

  <div class = "editPlayerWrapper" v-if="selectedRoute">
    <h2> {{ uiLabels.enterPlayer }} </h2>
      <label>
        <input type="text" v-model = "playerName" 
        @input="handleNameInput" 
        :placeholder="uiLabels.yourName"
        :class="{ 'invalid-name': playerNameEmpty}"
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
        :class="{ 'selected-color': colorObj.isSelected }"
      >
        <div class="piece-circle" :style="{ backgroundColor: colorObj.color }"></div>
      </div>
    </div>
  </label>
  </div>

  <button
    v-if="selectedRoute"
    id="create-lobby-button"
    class="main-button"
    @click="createPoll()"
  >
    {{ uiLabels.createLobby }}
</button>
</template>

<script>
import io from 'socket.io-client';

const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'CreateLobbyView',
  components: {
  },
  data: function () {
    return {
      uiLabels: {},
      gameID: "",
      playerName: "",
      playerNameEmpty: false,

      playerColorsObjs: [],
      selectedColorObj: {},
      colorIsSelected: true,
      helpOpen: false,


      lang: localStorage.getItem("lang") || "en",
      selectedRoute: null,
      routeIsSelected: true,
      images: [
      "../../public/img/1.jpg",
      "../../public/img/2.jpg",
      "../../public/img/3.jpg",
      ],
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    const randomNumber = Math.floor(Math.random() * 9000 + 1000);
    this.gameID = randomNumber;

    socket.emit("loadColors", this.gameID)
    socket.on("getColors", (colors) => {
      this.playerColorsObjs = colors;
    });

  },
  methods: {
    handleNameInput() {
      this.playerName = this.playerName.slice(0, 20);
      this.playerNameEmpty = false;
    },

    help2: function(){
      this.helpOpen = ! this.helpOpen
    },

    selectPlayerColor(colorObj) {
    if (this.selectedColorObj) {
      this.selectedColorObj.isSelected = false;
    }

    colorObj.isSelected = true;
    this.colorIsSelected = true;
    this.selectedColorObj = colorObj;
    },

    selectRoute(routeId) {
      this.selectedRoute = routeId;
      this.routeIsSelected = true;
    },

    createPoll: function () {
      if(this.playerName === "") {
        this.playerNameEmpty = true
      }
      if(!this.selectedColorObj.isSelected) {
        this.colorIsSelected = false
      }
      if(this.selectedRoute === null) {
        this.routeIsSelected = false
      }
      if(!this.playerNameEmpty && this.colorIsSelected && this.routeIsSelected) {
        this.$router.push({ path: `/lobby/${this.gameID}`, query: { playerName: this.playerName} });
        socket.emit("createPoll", { pollId: this.gameID, lang: this.lang, route: this.selectedRoute })
        socket.emit('joinLobby',  { gameID: this.gameID, playerName: this.playerName, playerColorObj: this.selectedColorObj, isHost: true});
      }
    },

  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
.popup{
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

header {
    height: 75px; 
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    margin: 0 auto;
  }
  
button {
  margin: 0.5em;
  margin-top: 10px;
}

.helpText {
  width: 370px;
  height: 470px;
  padding: 20px;
  background: rgb(244, 195, 195);
  border-radius: 10px;
  margin-left: 7em;
  margin-top:7em;
}
¨

#create-lobby-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
.orMessage {
  margin-top: 125px;
  margin-left: 10px;
  margin-right: 10px;
}

.Choose-Route {
  top: 50%;
  left: 50%;
}
.create-route-button {
  background-color: #ccc;
  color: #333;
  border: 2px solid #666;
  width: 200px;
  height: 200px;
  font-size: 60px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
}
.create-route-button:hover {
  background-color: #bbb; 
}
.button-grid {
  display: grid;
  grid-template-columns: repeat(3,200px);
}
.route-button {
  background-color: #ccc;
  border: 2px solid #666;
  width: 200px;
  height: 200px;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
}

.route-button:hover {
  border: 2px solid rgb(88, 234, 59);
  cursor: pointer;
}

.selected {
  border: 2px solid rgb(88, 234, 59);
}

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
.invalid-name {
  border-color: red;
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
.noColorSelected {
  border-color: red;
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
.selected-color {
  border: 2px solid rgb(88, 234, 59);
  border-radius: 50%;
}

.piece-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.noRouteSelected {
  color:red;
}
.noRouteSelectedBorder{
  border: 2px solid red;
  border-radius: 8px;
}
.noRouteSelectedBorder:hover{
  border: 0px;
  border-radius: 0px;
}
@media screen and (max-width:950px) {
  .button-grid {
    display: grid;
    grid-template-columns: repeat(3,120px);
  }
  .route-button{
    width: 120px;
    height: 120px;
  }
  .create-route-button{
    height: 120px;
    width: 120px;
  }
  .orMessage {
    margin-top: 95px;
  }
  
}
@media screen and (max-width:650px) {
  main {
    flex-direction: column;
  }
  .orMessage {
    margin-top: 0px;
  }
  .button-grid {
    display: flex;
    justify-content: center;
  }
  
}
@media screen and (max-width:360px) {
  .button-grid {
    display: grid;
    grid-template-columns: repeat(3,80px);
  }
  .route-button{
    width: 80px;
    height: 80px;
  }
  .create-route-button{
    height: 80px;
    width: 80px;
  }
  
}
@media screen and (max-height:650px){
  h1{
    font-size: 2em;
    margin: 8px;
  }
  h2{
    font-size: 1em;
    margin: 4px
  }
  .button-grid {
    display: grid;
    grid-template-columns: repeat(3,100px);
  }
  .route-button{
    width: 100px;
    height: 100px;
  }
  .create-route-button{
    height: 100px;
    width: 100px;
  }
}
</style>