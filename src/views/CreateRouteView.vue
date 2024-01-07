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
              <div v-if = "mapClicked" class="city-chooser">   
              </div>
          </div>
          <div>
            <City v-for="city in cities" :key="city.name" :city = "city" :hasPlayers="false" :mapSize="mapSize" @click = "loadCity(city)" class="city-hover">
            </City>
          </div>
        </Map>
      </div>

    <div id = "question-container">
      <h2>{{ uiLabels.createQuestions }}</h2>

      <div class = "editor-container">
      <input v-bind:disabled="isComponentDisabled" class="writeCity" v-model="selectedCity"  :placeholder= "uiLabels.cityName">

      <CreateComponent ref="createComponentRef0"  @addThisQuestion="addcreatechild" :componentDisabled = "isComponentDisabled" :uiLabels = "uiLabels" radioName = "first"></CreateComponent>
      <CreateComponent ref="createComponentRef1"  @addThisQuestion="addcreatechild" :componentDisabled = "isComponentDisabled" :uiLabels = "uiLabels" radioName = "second"></CreateComponent>
      <CreateComponent ref="createComponentRef2"  @addThisQuestion="addcreatechild" :componentDisabled = "isComponentDisabled" :uiLabels = "uiLabels" radioName = "third"></CreateComponent>

      <div class = "button-container">
        <button v-on:click="addCity" class = "edit-button" v-bind:disabled="isButtonDisabled">
            {{ uiLabels.saveCity }}
        </button>

        <button v-on:click="createNewCity" :class = "['edit-button', {'edit-button' : !isDisabled}]" v-bind:disabled="!isButtonDisabled">
            {{uiLabels.createCIty}}
        </button>
      
        <button v-on:click="removeCity" :class = "['edit-button', {'edit-button' : isSelected}]" v-bind:disabled="!cityClicked">
            {{uiLabels.removeCity}}
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
  import City from '../components/CityComponent.vue';

  const socket = io(sessionStorage.getItem("dataServer"));
  
  export default {
  components: { Map, CreateComponent, IdBox, City },
  name: 'CreateRouteView',
  data: function () {
    return {
      isError: false,
      lang: localStorage.getItem("lang") || "en",
      gameID:"",
      question: "",
      cityChosen: false, 
      answers: ["", ""],
      playerColorObj: {color: "#ff8b00",
                      isSelected: true},
      questionNumber: 0,
      data: {},
      location: { top: 10,
                y: 10
              },
      uiLabels: {},
      cities: {},
      mapSize: {
            width: 800,
            height: 750,
          },
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
      selectedColorObj: {},
      isComponentDisabled: false,
      isButtonDisabled: false,
      mapClicked: false,
      cityClicked: false,
      selectedCityobj: {}

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
    socket.emit("loadcities", this.gameID);

    socket.on("init", (labels) => {
      this.uiLabels = labels
    })

    socket.on("citiesLoaded", (cities) => {
      this.cities = cities;
    })

    socket.on("dataUpdate", (data) =>
      this.data = data
    )
    socket.on("pollCreated", (data) =>
      this.data = data
    )
  },
  
  methods: {
    addCity: function () {
      this.isError= false;
      this.questionsreal = [];
      if(this.selectedCity !== ""){
        for (let i = 0; i <3 ; i++) { 
        var createRef = this.$refs[`createComponentRef${i}`];
          createRef.addQuestion();
        
        if(this.isError){
          console.log("hejhej")
          this.questionsreal = []
        }
        }
        if(!this.isError){
            console.log("nu är vi här", this.gameID)
            this.isButtonDisabled = true; 
            this.mapClicked = false;
            this.isComponentDisabled = true;
            socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[0].question,answers:this.questionsreal[0].answers, c:this.questionsreal[0].correctIndex, city: this.selectedCity})
            socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[1].question,answers:this.questionsreal[1].answers, c:this.questionsreal[1].correctIndex, city: this.selectedCity})
            socket.emit("addQuestion", {pollId: this.gameID,  questionPart: this.questionsreal[2].question,answers:this.questionsreal[2].answers, c:this.questionsreal[2].correctIndex, city: this.selectedCity})
            socket.emit("saveCurrentCity", {top: this.location.y, left: this.location.x, name: this.selectedCity, first_letter: this.selectedCity.slice(0, 1), pollId: this.gameID})
            this.selectedCities.push(this.selectedCity)
            socket.emit("loadcities", this.gameID);
            this.cityChosen = true; 
            window.alert("city added")
            
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

    removeCity: function () {
      this.isComponentDisabled = true;
      this.isButtonDisabled = true;
      console.log(this.isComponentDisabled)

      socket.emit("removeCity", {gameID: this.gameID, selectedCity: this.selectedCity})

    },

    addcreatechild: function(childquestion, childanswers, childc){
      console.log(childanswers,childquestion,childc)
      if(childquestion !== ""){
        console.log(childquestion,childanswers[0],childanswers[1], "se om de har ändrats")
        if(childanswers[0] !== "" && childanswers[1] !== ""){
        if (childc > -1){
          console.log(this.questionsreal, "this should be empty otherwise big problem")
          this.questionsreal.push({question: childquestion, answers: childanswers, correctIndex: childc});

          //socket.emit("addQuestion", {pollId: this.pollId,  questionPart: childquestion,answers:childanswers, c:childc, city: this.selectedCity})
        }
        else{
          window.alert("add a correct answer");
          this.isError = true;
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
      this.mapClicked = true; 
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      this.location = {x: event.clientX - 10 - offset.x,
                        y: event.clientY - 10 - offset.y}

        console.log(this.location)
    },

    loadCity: function (city) {
      console.log("you clicked a city!")
      this.cityClicked = true
      this.selectedCity = city.name
      this.selectedCityobj = city
      console.log(this.cities)
      console.log(this.selectedCityobj)
      for (let i = 0; i <3 ; i++) {
        var createRef = this.$refs[`createComponentRef${i}`];
        createRef.loadCity(city, i);
    
         if(this.isError){
          this.questionsreal = []
          }
       }

    },

    createNewCity: function() {
      this.isButtonDisabled = false
      this.isComponentDisabled = false
      this.selectedCity = ""
      for (let i = 0; i <3 ; i++) {
        var createRef = this.$refs[`createComponentRef${i}`];
        createRef.createNewCity();
         if(this.isError){
          this.questionsreal = []
          }
       }

    }

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


  .edit-button{
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: floralwhite;
  text-align: center;
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid rgb(223, 217, 217);
  font-family: 'Varela Round', sans-serif;
}

.edit-button:hover {
  background-color: rgb(239, 234, 225);
}

.edit-button:disabled {
  cursor: auto;
  border: 2px solid rgb(241, 234, 234);
}

.edit-button:disabled:hover {
  background-color: floralwhite; /* Set the background color when disabled and hovered */
}

input:disabled {
  cursor: auto;
  border: 2px solid rgb(247, 226, 230);
  color: rgb(175, 174, 174);
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

.city-chooser {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: aqua;
  border-radius: 50%;
  box-shadow: -2px 7px 14px rgba(0, 0, 0, 0.7);
}


#mapWrapper {
  cursor: crosshair; 
}

#mapWrapper .infobox {
  cursor: auto; /* or any other cursor value you want for the infobox */
}

#mapWrapper .city-hover {
  cursor:pointer; /* or any other cursor value you want for the infobox */
  border-width: 10px;
  background-color: brown;
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