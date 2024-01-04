<template>
  <div id="wrapper">
    <Map 
    ref="mapRef" 
    :poll="poll" 
    @mapSizeChanged="handleMapSizeChanged" 
    class="map-container" >
    <template v-slot:city-lines>
      <CityLine v-for="(city, index) in poll.cities" :key="index" :city="city" :nextCity="getNextCity(index)" :mapSize="mapSize" />
    </template>
    <template v-slot:cities>
      <City v-for="(city,index) in poll.cities" :key="city.name" :city="city" :hasPlayers="true" :players="getPlayersInCity(index)" :mapSize="mapSize" :playerName="playerName"></City>
    </template>
    </Map> 
    <Question 
    class="question-container"
    :question="getQuestion(playerName)"
    @correctAnswerClick="handleCorrectAnswerClick"
    @wrongAnswerClick="getNewQuestion">
    </Question>
  </div>
</template>

<script>
import Question from '@/components/QuestionComponent.vue';
import Map from '../components/CanvasMapComponent.vue';
import City from '../components/CityComponent.vue';
import CityLine from "../components/CityLine.vue";

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  props: {
    playerName: String,
  },
  components: {Map, Question, City, CityLine},
  data() {
    return {
      question: {       
      q: "",       
      a: [],       
      c: null,      
      },
      pollId:"",
      poll: {},
      mapSize: {
        width: 0,
        height: 0,
      },
      randomNumber: -1,
      truthiness: false,
      };
      

  },

  created: function() {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)

    socket.on('thisPoll', poll =>
    this.poll = poll
    
    )
    /* socket.on("newQuestion", q =>
    this.question = q
    ) */

    /* socket.on("dataUpdate", answers =>
     this.submittedAnswers = answers
    ) */

    /* socket.on("pollCreated", (data) =>
     this.data = data
    ) */
    /* socket.on("sendNextQuestion", q =>
     this.question = q
    ) */

    socket.on("navigateToGameResultView", (gameID) => {
      this.$router.push({ path: `/gameResult/${gameID}`});
    })
 },

  methods: {
    /* sendButtonClicktoMap() {
      const myMap = this.$refs.mapRef;
      myMap.moveMeForward(); 
    }, */
    getNewQuestion(){
      let truth = true;
      let Newness = Math.floor(Math.random * 3)
      while(truth){
        if(Newness !== this.randomNumber)
        console.log("nu är vi i wronganswersclick filen")
          truth = false;
          this.randomNumber = Newness
          this.truthiness = true;
      }
      this.getQuestion(this.playerName)

    },
    handleCorrectAnswerClick() {
      socket.emit('goToNextCity', this.playerName, this.pollId)
    },
    handleMapSizeChanged(size) {
      this.mapSize = size;
    },
    /* getNextQuestion: function(index) {    
      this.index++
      socket.emit("getNextQuestion",{pollId: this.pollId, index: this.index})
    }, */
    getPlayersInCity(cityIndex) {
      return this.poll.participants.filter(player => player.city === cityIndex);
    },
    getQuestion: function(playerName) {
      console.log("tillbaks i get question", this.truthiness)
      const participant = this.poll.participants.find(participant => participant.name === playerName);
      if(!this.truthiness){
      if (participant) {
        let cityIndex = participant.city;
        if(this.poll.cities[cityIndex]) {
          this.randomNumber = Math.floor(Math.random() * 3);
          return this.poll.cities[cityIndex].questions[this.randomNumber]
        }
        else {
          return this.question;
        }
      } 
      else {
        return this.question; 
      }
    }
    else{
        console.log("tillbaks i get question nu sätts nya frågan")
        let cityIndex = participant.city;
        this.truthiness = false;
        return this.poll.cities[cityIndex].questions[this.randomNumber]
    }
    },
    getNextCity(currentIndex) {
      const nextIndex = (currentIndex + 1) % this.poll.cities.length;
      if(nextIndex === 0) {
        return null
      }
      else {
        return this.poll.cities[nextIndex];
      }
    },
  }
  };
</script>

<style scoped>
#wrapper .map-container{
  height: 80vh;
  overflow: auto;
  display: flex;
  justify-content: center;
}
#wrapper .question-container{
  height: 20vh;
  overflow: hidden;
}


/* #wrapper {
  display: grid;
  grid-template-rows: 80vh 20vh;
  overflow: hidden;
}

@media screen and (min-aspect-ratio: 2/1) {
  #wrapper {
    grid-template-columns: 80% 20%;
  }
  #wrapper .map-container, #wrapper .question-container {
    grid-row: 1 / span 2;
  }
} */
  </style>