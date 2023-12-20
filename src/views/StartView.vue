<template>
  <main>
    <section class="supportButtons">
      <button class="language-button" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <button class="help-button" @click="help"> {{ uiLabels.help }}</button>
    </section>
    
    <div v-if="helpOpen">
      <div class="backdrop" @click.self = "help">
      <div class="rules">
        <h3> {{uiLabels.ruleheader }}</h3>
        <div > <p> {{ uiLabels.rules }}</p> 
        </div>
      </div>
    </div>
    </div>
    <section class="mainButtons">
      <router-link class="main-button" to="/gameID/">{{uiLabels.joinGame}}</router-link>
      <router-link class="main-button" to="/createLobby/">{{uiLabels.createGame}}</router-link>
    </section>
  </main>
</template>

<script>
import ResponsiveNav from '@/components/ResponsiveNav.vue';

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'StartView',
  components: {
    ResponsiveNav
  },
  data: function () {
    return {
      uiLabels: {},
      id: "",
      lang: localStorage.getItem("lang") || "en", //Use localstorage sparsly to have it responsive
      hideNav: true,
      helpOpen: false,
    }
  },
  created: function () { //Created Hook, Before the content of the page is loaded the creaded hook is run
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => { //you should probablt have all the listeners in this created hook.
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
.supportButtons {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  margin-top: 1%;
}

.language-button {
  order: 1;
  margin-left: 4%;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: rgb(138, 211, 233);
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid rgb(228, 63, 118);
}

.help-button {
  order: 2;
  margin-right: 4%;
  display: inline-block;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: rgb(138, 211, 233);
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid rgb(228, 63, 118);

}

.mainButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.modal{
  justify-content: center;
  margin-top: 80vh;
  align-content: center;
}

.rules{
    width: 400px;
    height: 500px;
    padding: 20px;
    margin: 100px auto;
    background: rgb(244, 195, 195);
    border-radius: 10px;
  }

  .backdrop{
    position: fixed; 
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
  }
</style>