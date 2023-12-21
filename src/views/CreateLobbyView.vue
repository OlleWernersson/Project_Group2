<template>
  <header>
    <h1>
      {{ uiLabels.createLobby }}
    </h1>
  </header>
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
        to='/create/'
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
      lang: localStorage.getItem("lang") || "en",
      selectedRoute: null,
      images: [
      "../../public/img/europe.jpg",
      "../../public/img/africa.jpg",
      "../../public/img/southamerica.png",
  
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
  },
  methods: {
    selectRoute(routeId) {
      this.selectedRoute = routeId;

    },
    createPoll: function () {
      socket.emit("createPoll", {pollId: this.gameID, lang: this.lang, route: this.selectedRoute })
    },
  },
};
</script>

<style scoped>
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
main {
  display: flex;
  justify-content: center;
}
</style>