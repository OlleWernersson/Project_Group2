<template>
    <div id="wrapper">
      <div id="map">
        
        <div id="dots" :style="{ left: dotLeft + 'px', top: dotTop + 'px' }">T</div>
        
        <div id="cities" v-for="city in selectedcities" :style="{left: city.left + 'px',top:city.top  + 'px'}"> {{ city.Bletter }}</div>
        
        <button @click="moveMeForward"> move me! </button>
      
      </div>
     
      <div> <Question id = "buttonWrapper" :question = "question"/> </div> 
    
    </div>
  </template>
  
  <script>
  import Question from '../components/QuestionComponent.vue';

  export default {
    components: { Question },
    data() {
      return {
        dotTop: 100,
        dotLeft: 500,
        displayWrongSign: false,
        cityLeft: 500,
        cityTop: 200,
        selectedcities:[
            {top:500, left:200, Bletter: 'A'},
            {top:100, left:200, Bletter: 'B'},
            {top:200, left:500, Bletter: 'C'}
    ],
    currentCity: 0,
    question: 'This is a question, whats your answer?'
      };
    },
  
    methods: {
      moveMeForward() {
        this.dotLeft = this.selectedcities[this.currentCity].left;
        this.dotTop = this.selectedcities[this.currentCity].top -20;
        this.currentCity++;
      },
  
      wrongAnswer() {
        
      },
    },
  };
  </script>
  
  <style>
  #wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  #map {
    background-image: url('../public/img/polacks.jpg');
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
  