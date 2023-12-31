<template>
  <div id="wrapper">
      <Map ref = "mapRef" :poll = "poll">
        <City v-for="city in poll.cities" :key="city.name" :city = "city"> 
         </City> <!-- city läggs i slot i mapcomponent -->
      </Map> 
    <Question @correctAnswerClick = "getNextQuestion" id = "buttonWrapper" :question = "question"/> 
    <!-- <Question @correctAnswerClick = "sendButtonClicktoMap" id = "buttonWrapper" :question = "question"/> -->
    <!-- När Question  emittar ett correctAnswerClick (custom event) anropas metoden sendButtonClciktoMap
    i GameView -->
      <button @click="print"></button>
  </div>

  <!-- <City :cities = "cities" > </City> -->
  <!-- {{ pollId }}
  {{ poll }} -->
  {{ poll.cities[0] }}
  {{ playerName }}
</template>

<script>
import Question from '@/components/QuestionComponent.vue';
import Map from '../components/MapComponent.vue';
import City from '../components/CityComponent.vue';
/* import cities from '../../server/data/cities.json'; */

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
      index:null,
      pollId:"",
      poll: {},
      };

  },

  created: function() {
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)

    socket.on('thisPoll', poll =>
    this.poll = poll
    
    )
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
    },
    print: function(){
      console.log(this.poll.cities)
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