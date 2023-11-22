<template>
  <header>
<!--     <div v-bind:class="['hamburger', {'close': !hideNav}]" 
         v-on:click="toggleNav">
    </div>
    <div class="logo">
      Polly polling tool 
    </div> -->
  </header>
  <main>
    <section class="supportButtons">
      <button class="language-button" v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
      <button class="help-button">Help</button>
    </section>
    <section class="mainButtons">
      <router-link class="main-button" to="/join/">{{uiLabels.joinGame}}</router-link>
      <router-link class="main-button" to="/create/">{{uiLabels.createGame}}</router-link>
    </section>
  </main>
<!--   <ResponsiveNav v-bind:hideNav="hideNav">
    <button v-on:click="switchLanguage">{{uiLabels.changeLanguage}}</button>
    <router-link to="/create/">{{uiLabels.createPoll}}</router-link>
    <a href="">{{uiLabels.about}}</a>
    <a href="">FAQ</a>
  </ResponsiveNav>
  <h1>{{ uiLabels["sales-pitch"] }}</h1>
  <h2>{{ uiLabels.subHeading }}</h2>
  <label>
    Write poll id: 
    <input type="text" v-model="id">
  </label>
  <router-link v-bind:to="'/poll/'+id">{{uiLabels.participatePoll}}</router-link> -->
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
      hideNav: true
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
  margin-top: 4%;
}

.language-button {
  order: 1; /* Language button on the left */
  margin-left: 4%;
}

.help-button {
  order: 2; /* Help button on the right */
  margin-right: 4%;
}

.mainButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* Adjust the height as needed */
}
.main-button {
  display: inline-block;
  padding: 1em 2em; /* Adjust padding as needed */
  font-size: 1.2em; /* Adjust font size as needed */
  background-color: plum; /* Green background color */
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
}
/*   header {
    background-color: gray;
    width: 100%;
    display: grid;
    grid-template-columns: 2em auto;
  }
  .logo {
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 2.5rem;
    color: white;
    padding-top:0.2em;
  }
  .logo img {
    height:2.5rem;
    vertical-align: bottom;
    margin-right: 0.5rem; 
  }
  .hamburger {
    color:white;
    width:1em;
    display: flex;
    align-items: center;
    justify-content: left;
    padding:0.5rem;
    top:0;
    left:0;
    height: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

@media screen and (max-width:50em) {
  .logo {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hamburger::before {
    content: "☰";
  }
  .close::before {
    content: "✕";
  }
  .hide {
    left:-12em;
  }
} */
</style>

<!-- hej jag heter Ella --!>