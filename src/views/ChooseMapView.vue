<template>
    <section class="Choose-Route">
      <h2>
        Välj karta för att skapa rutt 
      </h2>
    </section>

    <section class="Choose-Route">
      <router-link
        class="button-grid"
        :to="'/create/' + gameID"
        tag="button"
      >
        <button
          v-for="buttonId in 4"
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
      </router-link>
    </section>
    </template> 
    <script>
import io from 'socket.io-client';


const socket = io(sessionStorage.getItem("dataServer"));
export default {
  name: 'ChooseMapView',
  components: {},
  data: function () {
    return {
      uiLabels: {},
      gameID: "",
      lang: localStorage.getItem("lang") || "en",
      selectedRoute: null,
      images: [
      "../../public/img/1.jpg",
      "../../public/img/2.jpg",
      "../../public/img/3.jpg",
      "../../public/img/4.jpg"
      ],
      mapImage: "", 
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
      this.mapImage = routeId;
      console.log("här är rutten", this.mapImage)
      this.createPoll()
    }, 

    createPoll: function () {
      socket.emit("createPoll", {pollId: this.gameID, lang: this.lang, route: null, mapImage: this.mapImage })
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
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




</style>