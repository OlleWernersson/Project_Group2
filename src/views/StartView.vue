<template>
  <main>
    <section class="buttonWrapper">
      <button class="supportButtons" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <h1 id="Titel">Kartgruppens spel</h1>
      <button class="supportButtons" @click="help"> {{ uiLabels.help }}</button>
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
      <div class = "train"> 
       </div>
      <router-link class="main-button" to="/join/">{{uiLabels.joinGame}}</router-link>
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
      hejlista: {hej:"hej",hej:"hej",hej:"hej"},
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
.buttonWrapper {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  margin-top: 1%;
}
#Titel{
  margin-right: 7%;
}

.train {
  background-image: url('../../public/img/train[75].png');
}


.mainButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
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
  }
  @media screen and (max-height: 400px) and (max-width: 768px){
    #Title{
      margin-top: 0px;
      margin-right: 6%;
    }
    .rules{
      height: 100%;
      width: 85%;
      margin: 25px auto;
      font-size: 1px;
    }
    .backdrop{
      position:absolute;
    }

    
  }
  @media  screen and (max-width: 768px){
    #Titel{
      margin-right: 6%;
    }
    .help-button{
      border-radius: 2vw;
      font-size: 1em;
      padding: 1.5em 3vw;
      height: 12%;
      width: 22vw
    }
    .language-button{
      border-radius: 2vw;
      font-size: 1em;
      padding: 1.5em 3vw;
      height: 12%;
      width: 22vw
    }
    .mainButtons{
      font-size: 0.8em;
      flex-direction: column;
    }
    .main-button{
      display: block
    }
    .backdrop{
      position:absolute;
    }
    .rules{
      height: 65vw;
      width: 85%;
      margin: 100px auto;
      font-size: 2.5vw;
    } 
  }
  @media screen and (max-height: 400px){
    #Title{
      margin-top: 0px;
    }
    .mainButtons{
      bottom: 0;
      right: 0;
      position: absolute;
      
    }
    .rules{
      height: 100%;
      width: 85%;
      margin: 100px auto;
      font-size: 4.5vh;
    }
    .backdrop{
      position:absolute;
    }

  }
  

</style>