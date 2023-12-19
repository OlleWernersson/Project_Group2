<template>
  <div id = wrapper>
  <div id = question> {{question.q}} </div>
  {{wrongOrRight}}
  <div id = buttonWrapper>
  <button v-for="(a,index) in question.a" v-bind:key="index" @click="checkCorrectAnswer(index)"> 
   {{a}} </button>

    <!-- Vill väl eventuellt skapa en for loop här, där lika många knappar som det finns svar lagrade 
    i frågan skapas, och ge dem texten av svarsalternativet. Kan man ge svaren true/false 
    för att signalera om dem är rätt eller fel? och välja clickevent baserat på det? Koden finns nedan -->
  </div>
  </div>
</template>

<script>
import { Socket } from 'socket.io-client'
export default {
  name: 'QuestionComponent',
  props: {
    question: Object,
    answers: Object
  }, 

    data: function () {  
     return {    
     wrongOrRight:"",
     }
  },

  methods: {
     checkCorrectAnswer(index) {
       console.log("nu är vi i checkCorrectAnswer")
       if (this.question.c === index) {
         this.wrongOrRight="RÄTT SVAR"
        //this.$emit('correctAnswerClick') 

       }
       else {this.wrongOrRight="FEL SVAR"}
       }
     }
   }


  /*,
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }*/
</script>

<style scoped> 

#wrapper {
  display: grid; 
  grid-template-rows: repeat(2 1fr);
}

#question {
  margin: 0;
  grid-row-gap: 10px;
  height: 500px;
  line-height: 500px;
  font-size: 1.7em;
}

#buttonWrapper {
  display: grid; 
  grid-template-rows: repeat(3 1fr);
}

button {
  display: grid, inline-block;
  grid-template-columns: 10%;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: plum;
  color: white;
  text-align: center;
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid pink;
}

</style>