<template>
  <header>
    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>

  <div class = "editPlayerWrapper">
    <h2> {{ uiLabels.enterPlayer }} </h2>
      <label>
        <input type="text" v-model = "playerName" placeholder="Your Name" autocomplete="off">
      </label>

      <label class="player-pieces-box">
        <p class="choose-color-text">{{ uiLabels.choosecolor }}</p>
        <div class="player-pieces">
          <div class="player-piece" v-for="(colorObj, index) in playerColorsObjs" :key="index" @click="selectPlayerColor(colorObj)">
            <div class="piece-circle" :style="{ backgroundColor: colorObj.color }"></div>
          </div>
        </div>
      </label>
  </div>

  <main>
    <section class="Choose-Route">
      <h2>
        {{uiLabels.chooseRoute}}
      </h2>
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

  <router-link
    id="create-lobby-button"
    class="main-button"
    :to="'/lobby/' + gameID"
    tag="button"
    @click="createPoll()"
  >
    {{ uiLabels.createLobby }}
  </router-link>
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

      playerColorsObjs: [],
      selectedColorObj: {},

      lang: localStorage.getItem("lang") || "en",
      selectedRoute: null,
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
    selectPlayerColor(colorObj) {
      colorObj.isSelected = true;
      this.selectedColorObj = colorObj; 
    },

    selectRoute(routeId) {
      this.selectedRoute = routeId;
    },

    createPoll: function () {
      socket.emit("createPoll", { pollId: this.gameID, lang: this.lang, route: this.selectedRoute })
      socket.emit('joinLobby',  { gameID: this.gameID, playerName: this.playerName, playerColorObj: this.selectedColorObj, isHost: true});
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
}

.player-piece {
  margin-right: 10px;
  cursor: pointer;
}

.piece-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>