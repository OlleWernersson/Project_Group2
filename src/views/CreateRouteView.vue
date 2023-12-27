<template>



  <div id = "bigWrapper">

  
  <div id = "mapWrapper">
  <Map>
  <area shape="rect" coords="0, 0, 100, 100"> <!-- obs chat gpt lösning denna rad-->
  </Map>
  </div>
  <div id = "questionWrapper">
  <button id="helpButton" @click="help2" >{{ uiLabels.help }} </button> 

  <div v-if="helpOpen">
      <div class="popup" @click.self = "help2">
        <div class="helpText">
          <div > <p> {{ uiLabels.helpText }}</p> 
        </div>
        </div>
      </div>
    </div>
    

  <h1>Create your questions here </h1>
  Poll link:
  <input type="text" v-model="pollId">
  <button v-on:click="createPoll">
  Create poll
  </button>
  <label for="options"></label>
    <select name="rcp" id="options" v-model="selectedCity">
        <option>Sheffield</option>
        <option>birmingham</option>
        <option>london</option>
    </select>

  <CreateComponent v-for="(_, i) in questions" type="text" v-bind:key="'questions'+i" :i="Question" @addThisQuestion="addcreatechild">
  </CreateComponent>
  {{ selectedCity }}
  {{ questionsreal}}
  
  

  <button v-on:click="addQuestion">
  Add question
  </button>
  <input type="number" v-model="questionNumber">
  <button v-on:click="runQuestion">
  Run question
  </button>
  </div>
  
  
  {{data}}
  <router-link v-bind:to="'/result/'+pollId">Check result</router-link>
  </div>
  <div id="cities-map">
  <div v-for="city in cities"> {{city.first_letter}}</div>
  <City v-for="city in cities"
  v-bind:city="city"
  v-bind:key="city.name"/>
  </div>
  </template>
  
  
  <script>
  import io from 'socket.io-client';
  import City from '../components/CityComponent.vue';
  import Map from '../components/MapComponent.vue';
  import CreateComponent from '../components/CreateComponent.vue';
  
  
  const socket = io("localhost:3000");
  
  
  export default {
  components: { Map, City, CreateComponent },
  name: 'CreateRouteView',
  data: function () {
  return {
  lang: localStorage.getItem("lang") || "en",
  pollId: "",
  question: "",
  answers: ["", ""],
  questionNumber: 0,
  data: {},
  uiLabels: {},
  cities: {},
  questions: {
   question1: {  },
   question2: {  },
   question3: {  }
  },
  questionsreal: [],
  c:null,
  selectedCity: "",
  helpOpen: false
  }
  },
  created: function () {
  this.id = this.$route.params.id;
  socket.emit("pageLoaded", this.lang);
  socket.emit("loadcities");
  socket.on("init", (labels) => {
  this.uiLabels = labels
  })
  socket.on("citiesLoaded", (cities) => {
  this.cities = cities;
  console.log(cities)
  })
  socket.on("dataUpdate", (data) =>
  this.data = data
  )
  socket.on("pollCreated", (data) =>
  this.data = data)
  },
  methods: {
  createPoll: function () {
    socket.emit("createPoll", {pollId: this.pollId, lang: this.lang })
  },
  addQuestion: function () {
    console.log("nu är du här", this.questionsreal[0])
  //socket.emit("addQuestion", {pollId: this.pollId, q: this.question, a: this.answers, c:this.c} )
  },
  addAnswer: function () {
  this.answers.push("");
  },
  removeAnswer: function() {
  this.answers.pop("")
  },
  addcreatechild: function(childquestion,childanswers,childc){
    if (  childc !== 0){
      console.log("message from child is here", childquestion,childanswers,childc);
      this.questionsreal.push({question: childquestion,answers:childanswers,correctIndex:childc, city: this.selectedCity});
    }
    else{
      window.alert("add a correct answer");
    }

  },
  
  
  runQuestion: function () {
  socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
  },
  
  
  selectedAnswerIndex: function (i) {
  this.c=i
  },

    help2: function(){
      this.helpOpen = ! this.helpOpen
    }
  }
  }
  </script>
  
  
  <style scoped>
  main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Utan denna så kan man klicka på input bredvid var det faktiskt är */
  height: 100vh;
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
  
  
  button {
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  width: 150px;
  font-size: 1em;
  margin-top: 10px;
  
  
  outline: none;
  
  

  
  background-color: plum;
  color: white;
  text-align: center;
  text-decoration: none;
  
  
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid pink;
  }
  
  
  #bigWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  }

  #helpButton{
    position:absolute;
    left: 82em;
    padding: 0.5em 0em;
    width: 100px;
  }

  .popup{
    position: fixed; 
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;
  
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
  
  
  </style>
  