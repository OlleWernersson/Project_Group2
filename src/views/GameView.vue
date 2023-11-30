<template>
    <div id="wrapper">
      <div id="background">
        <div id="dots" :style="{ left: dotLeft + 'px', top: dotTop + 'px' }">T</div>
        <div id="cities" v-for="city in selectedcities" :style="{left: city.left + 'px',top:city.top  + 'px'}"> {{ city.Bletter }}</div>
      </div>
  
      <div id="buttonWrapper">
        <button @click="moveMeForward">Answer 1</button>
        <button @click="wrongAnswer">Answer 2</button>
        <button @click="wrongAnswer">Answer 3</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dotTop: 100,
        dotLeft: 500,
        displayWrongSign: false,
        cityLeft: 500,
        cityTop: 200,
        selectedcities:[
            {top:500,left:200, Bletter: 'A'},
            {top:100,left:200,Bletter: 'B'},
            {top:200,left:500,Bletter:'C'}
    ],
    currentCity: 0,
        
      };
    },
  
    methods: {
      moveMeForward() {

        console.log("You clicked me!");
        this.dotLeft += 10;
        this.dotTop += 0;
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
  