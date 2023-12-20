<template>
  <div id="wrapper">
      <Map ref = "mapRef" :cities = "cities">
        <City v-for="city in cities" :key="city.name" :city = "city"> 
         </City> <!-- city läggs i slot i mapcomponent -->
      </Map> 
    <Question @correctAnswerClick = "getNextQuestion" id = "buttonWrapper" :question = "question"/> 
    <!-- <Question @correctAnswerClick = "sendButtonClicktoMap" id = "buttonWrapper" :question = "question"/> -->
    <!-- När Question  emittar ett correctAnswerClick (custom event) anropas metoden sendButtonClciktoMap
    i GameView -->

  </div>

  <City :cities = "cities" > </City>
</template>

<script>
import Question from '@/components/QuestionComponent.vue';
import Map from '../components/MapComponent.vue';
import City from '../components/CityComponent.vue';
import cities from '../../server/data/cities.json';

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  components: {Map, Question, City},
  data() {
    return {
        question: {       
        q: "",       
        a: [],       
        c: null,      
      },
      cities: cities,
      index:null
      };

  },

  created: function() {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
    this.question = q
    )

   socket.on("dataUpdate", answers =>
     this.submittedAnswers = answers
     )

    socket.on("pollCreated", (data) =>
     this.data = data
     )

    socket.on("sendNextQuestion", q =>
     this.question = q)
 },

  methods: {
    sendButtonClicktoMap() {
      const myMap = this.$refs.mapRef;
      myMap.moveMeForward(); 
    },

    getNextQuestion: function(index) {    
      this.index++
      socket.emit("getNextQuestion",{pollId: this.pollId, index: this.index})
    }
  }
  };
</script>

<style>
#wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50%;
}
  </style>