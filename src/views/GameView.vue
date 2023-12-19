<template>
  <div id="wrapper">
      <Map ref = "mapRef">
        <area shape="rect" coords="0, 0, 100, 100">  <!-- obs chat gpt lösning denna rad-->
      </Map> 
    <Question @correctAnswerClick = "sendButtonClicktoMap" id = "buttonWrapper" :question = "question"/> 
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
      question: 'This is a question, whats your answer?',
      cities: cities
      };
  },

  methods: {
    sendButtonClicktoMap() {
      const myMap = this.$refs.mapRef;
      myMap.moveMeForward(); 
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