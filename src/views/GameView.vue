<template>
  <div class="background">
  <div id="wrapper">
    <Map 
      v-if="poll && poll.cities"
      ref="mapRef" 
      :poll="poll" 
      @mapSizeChanged="handleMapSizeChanged" 
      class="map-container"
      :style="{width:mapSize.width + 'px'}"
    >
    <template v-slot:city-lines>
      <CityLine v-for="(city, index) in poll.cities" :key="index" :city="city" :nextCity="getNextCity(index)" :mapSize="mapSize" />
    </template>
    <template v-slot:cities>
      <City v-for="(city,index) in poll.cities" :key="city.name" :city="city" :hasPlayers="true" :players="getPlayersInCity(index)" :mapSize="mapSize" :playerName="playerName"></City>
    </template>
    </Map> 
  </div>
    <Question 
      v-if="poll"
      class="question-container"
      :question="getQuestion(playerName)"
      :participant="getParticipant(playerName)"
      @correctAnswerClick="handleCorrectAnswerClick"
      @wrongAnswerClick="getNewQuestion"
      @minusOneCountdown="updateCountdown"
      @resetCountdown="resetCountdown"
      @setMaxCountdown="setCountdown"
    >
    </Question>
    
    <div>
      <audio ref="failAudio" src="../public/mp3/fail.mp3"></audio>
      <audio ref="bonusAudio" src="../public/mp3/bonus.mp3"></audio>
      <audio ref="backgroundAudio" src="../public/mp3/background.mp3" autoplay loop></audio>
    </div>
</div>
</template>

<script>
import Question from '@/components/QuestionComponent.vue';
import Map from '../components/CanvasMapComponent.vue';
import City from '../components/CityComponent.vue';
import CityLine from "../components/CityLine.vue";

import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));

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

      };
      

  },
  mounted() {
    if (this.poll && this.poll.cities) {
      this.updateMapData();
    } else {
      socket.on('thisPoll', poll => {
        this.poll = poll;
        this.updateMapData();
      });
    }

    this.playSound("background")
  },

  created: function() {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)

    socket.on('thisPoll', poll =>
    this.poll = poll
    
    )
    socket.on("navigateToGameResultView", (gameID) => {
      this.$router.push({ path: `/gameResult/${gameID}`});
    })
  },


  methods: {
    playBackgroundSound() {
      const audio = this.$refs.backgroundAudio;
      audio.play();    
    },
    playSound(sound) {
      if(sound==="fail") {
        const audio = this.$refs.failAudio;
        audio.play();    

      }
      if(sound==="bonus") {
        const audio = this.$refs.bonusAudio;
        audio.play();    
      }

      if(sound=="background") {
        const audio = this.$refs.backgroundAudio;
        audio.play();    
      }
    },

    setCountdown(){
      socket.emit('setMaxCountdown', this.playerName, this.pollId)
    },
    getParticipant(playerName){
      if(this.poll.participants){
      console.log(this.poll.participants)
      const participant = this.poll.participants?.find(participant => participant.name === playerName);
      console.log(participant)
      return participant
      }
    },
    updateCountdown(){
      socket.emit('updateCountdown',this.playerName, this.pollId)
    },
    resetCountdown(){
      socket.emit('resetCountdown', this.playerName, this.pollId)
    },

    getNewQuestion(){
      socket.emit("updateQuestionIndex",this.playerName, this.pollId)
      this.playSound("fail");
    },
    handleCorrectAnswerClick() {
      socket.emit('goToNextCity', this.playerName, this.pollId)
      this.playSound("bonus");
    },
    handleMapSizeChanged(size) {
      this.mapSize = size;
    },
    getPlayersInCity(cityIndex) {
      return this.poll.participants.filter(player => player.city === cityIndex);
    },
    getQuestion: function(playerName) {
      console.log("tillbaks i get question")
      const participant = this.poll.participants?.find(participant => participant.name === playerName);
  
      if (participant) {
        let cityIndex = participant.city;
        let qIndex = participant.questionIndex;
        if(this.poll.cities[cityIndex]) {
          if(qIndex <= 2){
          return this.poll.cities[cityIndex].questions[qIndex]
          }
        }
        else {
          return this.question;
        }
      } 
      else {
        return this.question; 
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
    updateMapData() {
      if (this.$refs.mapRef && typeof this.$refs.mapRef.drawMap === 'function') {
        this.$refs.mapRef.drawMap();
      }
    },
  }
  };
</script>

<style scoped>
#wrapper {
  overflow: auto;
  max-width: 100vw;
}
#wrapper .map-container{
  height: 80vh;
  /* overflow: scroll; */
  display: flex;
  /* justify-content: center; */
  /* width: 300px; */
  margin: 0 auto

}
#wrapper .question-container {
  flex: 20vh;
  overflow: hidden;
  background-color: #e9defa;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid pink;
  border-radius: 8px;
  max-width: 90vw; /* Justera max-bredden efter behov */
  margin: 0 auto;
  padding: 0.3em;
}

.background {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #5acce5ff; 
}

  </style>