<template>
  <div id = "bigWrapper">
    <div id = "mapWrapper" v-on:click="setLocation">
      <Map :poll = "poll" :players=[]>
        <label class = "infobox">Click somewhere on the map to choose where you want your city to be</label>
      <area shape="rect" coords="0, 0, 100, 100"> <!-- obs chat gpt lösning denna rad-->
      <div id="dots" v-bind:style= "{ left: location.x + 'px', top: location.y + 'px' }">
        <div class="clickDot">  </div>
        </div>
      </Map>
    </div>
  <div id = "questionWrapper">
  <button id="helpButton" @click="help2" >{{ uiLabels.help }} </button> 

    <div v-if="helpOpen">
      <div class="popup" @click.self = "help2">
        <div class="helpText">
          <div> <p> {{ uiLabels.helpText }}</p> 
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
  <input  class="writeCity" v-model="selectedCity"  placeholder= "Write city name">

  <label for="options"></label>
    <!-- <select name="rcp" id="options" v-model="selectedCity">
        <option v-for="city in cities" v-bind:key="city.name"> {{ city.name }} </option>
    </select>  -->


  <CreateComponent ref="createComponentRef0"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
  <CreateComponent ref="createComponentRef1"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
  <CreateComponent ref="createComponentRef2"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>


  <button @click="createLobby">Create lobby</button>
  {{ questionsreal }}

  
  

      <button v-on:click="addAllQuestions">
          New city 
      </button>
    </div>
    </div>
  </template>
  
  
  <script>
  import io from 'socket.io-client';
  import Map from '../components/MapComponent.vue';
  import CreateComponent from '../components/CreateComponent.vue';
  import IdBox from '@/components/id-box.vue';

  const socket = io("localhost:3000");
  
  export default {
  components: { Map, CreateComponent, IdBox },
  name: 'CreateRouteView',
  data: function () {
  return {
  isError: false,
  lang: localStorage.getItem("lang") || "en",
  gameID:"",
  question: "",
  cityChosen: false, 
  answers: ["", ""],
  playerName: "Host",
  playerColorObj: {color: "#ff8b00",
                   isSelected: true},
  questionNumber: 0,
  data: {},
  location: { top: 10,
            y: 10
          },
  uiLabels: {},
  cities: {},
  questions: {
   question1: {  },
   question2: {  },
   question3: {  }
  },
  questionsreal: [],
  c: null,
  selectedCity: "",
  helpOpen: false,
  selectedCities: [],
  amountButtonPressed: 1, 
  playerName:"noPlayerHost", 
  selectedColorObj: {}
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
  socket.on()
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
          socket.emit("saveCurrentCity", {top: this.location.y, left: this.location.x, name: this.selectedCity, first_letter: this.selectedCity.slice(0, 1), pollId:this.gameID})
          this.selectedCities.push(this.selectedCity)
          this.selectedCity = ""
        }
    }
    else{
      window.alert("please select a city")
    }
  },
  
  createLobby: function () {
    this.$router.push({ path: `/lobby/${this.gameID}`, query: { playerName: this.playerName} });
    socket.emit("createPoll", { pollId: this.gameID, lang: this.lang, route: this.selectedRoute })
    socket.emit('joinLobby',  { gameID: this.gameID, playerName: this.playerName, playerColorObj: this.selectedColorObj, isHost: true});
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
        this.questionsreal.push({question: childquestion, answers: childanswers, correctIndex: childc});
      
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

  help2: function(){
    this.helpOpen = ! this.helpOpen
  },

  setLocation: function (event) {
    var offset = {x: event.currentTarget.getBoundingClientRect().left,
                  y: event.currentTarget.getBoundingClientRect().top};
    this.location = {x: event.clientX - 10 - offset.x,
                      y: event.clientY - 10 - offset.y}

      console.log(this.location)
  },
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
  
  #dots {
  position: absolute;
}

#dots div {
  position: absolute;
  background: rgb(0, 0, 0); 
  border-radius: 50%; 
  width: 10px; 
  height: 10px;
}

#mapWrapper {
  cursor: pointer; 
}

.infobox {
  position: absolute;
  top: 1.5em;
  left: 7.5em;
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  width: 600px;
  font-size: 0.5em;
  margin-left: 30px;
  text-align: center;
 
  background-color:#53a8b6;
  outline: none;
}
  </style>