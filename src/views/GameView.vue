<template>
    <div id="wrapper">
        <Map ref = "mapRef">
          <area shape="rect" coords="0, 0, 100, 100">  <!-- obs chat gpt lösning denna rad-->
        </Map> 
      <Question @correctAnswerClick = "sendButtonClicktoMap" id = "buttonWrapper" :question = "question"/> 
      <!-- När Question  emittar ett correctAnswerClick (custom event) anropas metoden sendButtonClciktoMap
      i GameView -->

    </div>
  </template>
  
  <script>
  import QuestionComponent from '@/components/QuestionComponent.vue';
  import io from 'socket.io-client';
  const socket = io("localhost:3000");
  export default {
    data() {
      return {
        question: 'This is a question, whats your answer?'
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
  
  #buttonWrapper {
    display: grid;
    grid-template-rows: repeat(3, 1fr); 
    margin: 50% 10px 0px 10px;
    grid-row-gap: 10px;
    height: 50%;
  }
  
  #background {
    background-image: url('/Users/majadakad/Documents/Project_Group2/public/img/polacks.jpg');
    width: 100%;
    height: 26em;
    position: relative;
    font-size: 2em;
  }
  
  #dots {
    background-color: blue;
    border-radius: 15px;
    position: absolute;
    font-size: 1em;
    width: 35px;
  }
  #cities{
    position:absolute;
  }
  </style>