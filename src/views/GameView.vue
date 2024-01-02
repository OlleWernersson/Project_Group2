<template>
  <!-- {{ mapSize }} -->
  <div id="wrapper">
    <Map ref = "mapRef" :poll = "poll" @mapSizeChanged="handleMapSizeChanged" class="map-container">
      <City v-for="(city,index) in poll.cities" :key="city.name" :city = "city" :players="getPlayersInCity(index)" :mapSize="mapSize"> 
        </City> <!-- city läggs i slot i mapcomponent -->
    </Map> 
    <Question 
    class="question-container"
    :question="getQuestion(playerName)"
    @correctAnswerClick="handleCorrectAnswerClick">
    </Question>
  </div>
  <!-- {{ mapSize }} -->
</template>

<script>
import Question from '@/components/QuestionComponent.vue';
import Map from '../components/CanvasMapComponent.vue';
import City from '../components/CityComponent.vue';

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  props: {
    playerName: String,
  },
  components: {Map, Question, City},
  data() {
    return {
      question: {       
      q: "",       
      a: [],       
      c: null,      
      },
      /* index:null, */
      pollId:"",
      poll: {},
      mapSize: {
        width: 0,
        height: 0,
      },
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
      const participant = this.poll.participants.find(participant => participant.name === playerName);

      if (participant) {
        let cityIndex = participant.city;
        if(this.poll.cities[cityIndex]) {
          const randomNumber = Math.floor(Math.random() * 3);
          return this.poll.cities[cityIndex].questions[randomNumber]
        }
        else {
          return this.question;
        }
      } 
      else {
        return this.question; 
      }
    },
  }
  };
</script>

<style>
#wrapper {
  display: grid;
  grid-template-rows: 80% 20%;
  height: 100vh;
}
@media screen and (min-aspect-ratio: 2/1) {
  #wrapper {
    grid-template-columns: 80% 20%;
  }
  #wrapper .map-container, #wrapper .question-container {
    grid-row: 1 / span 2;
  }
}
  </style>