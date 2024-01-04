<template>
  <main>
    <div v-if="helpOpen">
        <div class="popup" @click.self = "help2">
          <div class="helpText">
             <p> {{ uiLabels.helpText }}</p> 
          </div>
        </div>
      </div>

    <header> 
      <button class="supportButtons" @click="help2" >{{ uiLabels.help }} </button> 
      <h1> {{uiLabels.createHeader}}</h1>
    </header>
  
    <section class = "container">
      <div id = "mapWrapper" v-on:click="setLocation">
        <Map :poll = "poll" :players=[]>
          <h2 class = "infobox">
            {{ uiLabels.cityChoserInfo }}
          </h2>
            <area shape="rect" coords="0, 0, 100, 100"> <!-- obs chat gpt lösning denna rad-->
            <div id="dots" v-bind:style= "{ left: location.x + 'px', top: location.y + 'px' }">
              <div class="city-style">   
              </div>
          </div>
        </Map>
      </div>

    <div id = "question-container">
      <h2>{{ uiLabels.createQuestions }}</h2>

      <div class = "editor-container">
      <input class="writeCity" v-model="selectedCity"  :placeholder= "uiLabels.cityName">

      <CreateComponent ref="createComponentRef0"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
      <CreateComponent ref="createComponentRef1"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>
      <CreateComponent ref="createComponentRef2"  type="text"  @addThisQuestion="addcreatechild"></CreateComponent>

      <div class = "button-container">
        <button v-on:click="addAllQuestions" class = "edit-button">
            {{ uiLabels.saveCity }}
        </button>

        <button v-on:click="createNewCity" class = "edit-button">
            {{uiLabels.createCIty}}
        </button>
      </div>
      </div>
    </div>
    </section>

      <section class = bottom-container>
        <button @click="createLobby" class = "main-button">
         {{ uiLabels.createMapRacer }}
        </button>
      </section>
    </main>
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
  header {
    height: 75px; 
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    margin: 0 auto;
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
    margin: 0.5em;
    margin-top: 10px;
  }
  
  
  .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px;
  }

  .popup{
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .button-container {
    display: flex;
    align-items: center;
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

.city-style {
  position: absolute;
  background: radial-gradient(pink 0%, red 90%, black 10%);
  border-radius: 150px; 
  width: 20px; 
  height: 20px;
  box-shadow: -9px 14px 28px rgba(0, 0, 0, 0.2);
}

#mapWrapper {
  cursor: pointer; 
  /* border: solid black;
  border-radius: 10px; */
}

#question-container {
  /* border: solid black;
  border-radius: 10px; */
  margin-left: 7px;
}

.editor-container {
  display: flex;
  flex-direction: column;
}

.infobox {
  position: absolute;
  top: 1.5em;
  left: 7.5em;
  padding: 10px;
  width: 600px;
  font-size: 0.5em;
  margin-left: 30px;
  text-align: center;
  background: rgb(239, 180, 239);
  border-radius: 10px;
}
.bottom-container {
  display: flex;
  justify-content: flex-end;
}
  </style>