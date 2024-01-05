<template>
  <main>
    <h1 id="Titel">MapRace</h1>
    <section class="buttonWrapper">
      <button class="supportButtons" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <button class="supportButtons" @click="help"> {{ uiLabels.help }}</button>
    </section>

    <div v-if="helpOpen">
      <div class="backdrop" @click.self="help">
        <div class="rules">
          <h3> {{uiLabels.ruleheader }}</h3>
          <div>
            <p> {{ uiLabels.rules }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="mainButtons">
      <div class="train"></div>
      <router-link class="main-button" to="/join/">{{uiLabels.joinGame}}</router-link>
      <router-link class="main-button" to="/createLobby/">{{uiLabels.createGame}}</router-link>
    </section>
  </main>
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';

import io from 'socket.io-client';
/* sessionStorage.setItem("dataServer","192.168.50.118:3000") */
sessionStorage.setItem("dataServer","localhost:3000")
const socket = io(sessionStorage.getItem("dataServer"));

export default {
  name: 'StartView',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en",
      hideNav: true,
      helpOpen: false,
      hejlista: {hej:"hej",hej:"hej",hej:"hej"},
    }
  },
  created: function () { 
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  },
  methods: {
    switchLanguage: function() {
      if (this.lang === "en") {
        this.lang = "sv"
      }
      else {
        this.lang = "en"
      }
      localStorage.setItem("lang", this.lang);
      socket.emit("switchLanguage", this.lang)
    },
    toggleNav: function () {
      this.hideNav = ! this.hideNav;
    },
    help: function(){
      this.helpOpen = ! this.helpOpen
    }
  }
}
</script>


<style scoped>
.buttonWrapper {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
}
#Titel{
  margin-top: 20vh;
}
.train {
  background-image: url('../../public/img/train[76].png');
}
.mainButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.rules{
  width: 400px;
  height: 500px;
  padding: 2em;
  margin: 100px auto;
  background: rgb(244, 195, 195);
  border-radius: 10px;
}

.backdrop{
  position: fixed; 
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
@media  screen and (max-width: 768px){
  .supportButtons{
    padding: 0.8em 1.5em;
    font-size: 0.8em;
  }
  .mainButtons{
    font-size: 0.8em;
    flex-direction: column;
  }
  .main-button{
    display: block
  }
  .backdrop{
    position: absolute;
  }
  .rules{
    height: 65vw;
    width: 85%;
    margin: 100px auto;
    font-size: 2.5vw;
  } 
}
@media  screen and (max-width: 850px){
  .mainButtons{
    font-size: 0.8em;
  }
}


</style>