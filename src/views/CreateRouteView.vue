<template>
  <div id = "bigWrapper">
  <div id = "mapWrapper">
  <Map :poll = "poll">
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

    <Id-box :id="gameID"></Id-box>

    

  <h1>Create your questions here </h1>
  <!-- Poll link:
  <input type="text" v-model="pollId"> -->
  <!-- <button v-on:click="createPoll">
  Create poll
  </button> -->
  <label for="options"></label>
    <select name="rcp" id="options" v-model="selectedCity">
        <option v-for="city in cities" v-bind:key="city.name"> {{ city.name }} </option>
    </select> 


  <CreateComponent ref="createComponentRef0"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
  <CreateComponent ref="createComponentRef1"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
  <CreateComponent ref="createComponentRef2"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>


  <button @click="startGame">Start game!</button>
  {{ selectedCity }}
  {{ questionsreal}}
  
  

  <button v-on:click="addAllQuestions">
  Add question
  </button>
  <input type="number" v-model="questionNumber">
  <button v-on:click="runQuestion">
  Run question
  </button>
  {{ selectedCities }}
  <button @click="loadPreviousQuestions">Load previous question</button>
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
  import IdBox from '@/components/id-box.vue';

  
  
  const socket = io("localhost:3000");
  
  
  export default {
  components: { Map, City, CreateComponent, IdBox },
  name: 'CreateRouteView',
  data: function () {
  return {
  isError: false,
  lang: localStorage.getItem("lang") || "en",
  gameID:"",
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
  helpOpen: false,
  selectedCities: [],
  amountButtonPressed: 1
  }
  },
  created: function () {
  this.gameID = this.$route.params.id
  socket.emit("joinPoll", this.gameID)
  socket.emit('getPoll', this.gameID)

  socket.on('thisPoll', poll =>
  this.poll = poll
  )
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
  addAllQuestions: function () {
    this.isError= false;
    if(this.selectedCity !== ""){
      for (let i = 0; i <3 ; i++) { 
      var createRef = this.$refs[`createComponentRef${i}`];
      
        createRef.addQuestion();
        console.log("inne i forloopen")
      if(this.isError){
        this.questionsreal = []
      }
      }
      if(!this.isError){
          console.log("nu är vi här", this.gameID)
          socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[0].question,answers:this.questionsreal[0].answers, c:this.questionsreal[0].correctIndex, city: this.selectedCity})
          socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[1].question,answers:this.questionsreal[1].answers, c:this.questionsreal[1].correctIndex, city: this.selectedCity})
          socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[2].question,answers:this.questionsreal[2].answers, c:this.questionsreal[2].correctIndex, city: this.selectedCity})
          console.log(this.cities)
          for(let i = 0; i < this.cities.length; i++){
            if(this.cities[i].name === this.selectedCity){
              socket.emit("saveCurrentCity", {top: this.cities[i].top, left: this.cities[i].left, name: this.cities[i].name, first_letter: this.cities[i].first_letter})
            }
          }
          this.selectedCities.push(this.selectedCity)
        }
    }
    else{
      window.alert("please select a city")
    }
  },

  addAnswer: function () {
  this.answers.push("");
  },
  removeAnswer: function() {
  this.answers.pop("")
  },

  addcreatechild: function(childquestion, childanswers, childc){
    console.log(childanswers,childquestion,childc)
    if(childquestion !== ""){
      console.log(childanswers[0],childanswers[1])
      if(childanswers[0] !== "" && childanswers[1] !== ""){
      if (childc > -1){
        console.log("message from child is here", childquestion,childanswers,childc);
        this.questionsreal.push({question: childquestion,answers:childanswers,correctIndex:childc, city: this.selectedCity});
      
        //socket.emit("addQuestion", {pollId: this.pollId,  questionPart: childquestion,answers:childanswers, c:childc, city: this.selectedCity})
      }
      else{
        window.alert("add a correct answer");
      }
    }
    else{
      window.alert("you forgot to fill in an answer field")
      this.isError= true;
    }
  }
    else{
      window.alert("you forgot to fill a question field please try again")
      this.isError= true;
      throw new Error("you forgot to fill in a question field ")
      

    }

  },
  loadPreviousQuestions: function(){
    let City = this.selectedCities[this.selectedCities.length -this.amountButtonPressed]
    console.log(City)
    this.amountButtonPressed++
    console.log(this.amountButtonPressed)
    if(typeof City !== undefined){
    socket.emit("getQuestionForCity", {pollID: this.gameID, city: City})
    }
    else{
      throw new Error("Unable to get city")
    }
  },  
  
  
  runQuestion: function () {
  socket.emit("runQuestion", {pollId: this.pollId, questionNumber: this.questionNumber})
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
    left: 1em;
    top: 1em;
    padding: 0.5em 0em;
    width: 105px;
    height: 45px;
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
  