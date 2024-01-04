<template>
  <header>
    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>

  <div class = "editPlayerWrapper">
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
    <section class="Create-Route">
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

  <button
    id="create-lobby-button"
    class="main-button"
    @click="createPoll()"
  >
    {{ uiLabels.createLobby }}
</button>
</template>

<script>
import io from 'socket.io-client';

const socket = io("localhost:3000");

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

    selectPlayerColor(colorObj) {
    // Deselect the previously selected color
    if (this.selectedColorObj) {
      this.selectedColorObj.isSelected = false;
    }

    // Select the new color
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

#create-lobby-button {
  position: absolute;
  bottom: 0;
  right: 0;
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
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
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
@media screen and (max-width:768px) and (max-height:600px){
  h2{
    font-size: 1em;
  }
  #create-lobby-button{
    top: 0;
    left: 0;
    position: absolute;
    height: 3em;
    width: 6em;
  }
  input {
    padding: 5px;
    border: 2px solid pink;
    border-radius: 8px;
    width: 150px;
    font-size: 1em;
    margin-top: 5px;
  }
  
}
@media screen and (max-width:768px) {
  h2{
      font-size: 1em
    }
  button{
    border-radius: 2vw;
      font-size: 1em;
      padding: 1vh 3vw;
      height: 12vh;
      width: 22vw
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
@media screen and (max-height:600px){
  h1{
    font-size: 1em;
    margin: 8px;
  }
  h2{
    font-size: 0.5em;
    margin: 4px
  }
  button{
    border-radius: 2vw;
      font-size: 1em;
      padding: 1vh 3vw;
      height: 12vh;
      width: 1em;
  }
  #create-lobby-button{
    height: 3em;
    width: 6em;
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