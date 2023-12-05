<template>
  <div id = wrapper>
  <div id = question> This is a question, what's your answer? </div>
  <div id = buttonWrapper>
    <button @click="correctAnswerClicked"> Correct Answer!</button>
    <button @click="wrongAnswerClicked"> Wrong Answer</button>
    <button @click="wrongAnswerClicked"> Wrong Answer</button>
  </div>
  </div>


<!-- <p> {{ question }}</p>
    <button v-for="a in question.a" v-on:click="answer(a)" v-bind:key="a">
      {{ a }}
    </button>
-->

</template>
<script>

export default {
  name: 'QuestionComponent',
  props: {
    question: Object,
    answers: Object
  }, 

  methods: {
      correctAnswerClicked() {
        console.log("You clicked the correct answer!");
      },
  
      wrongAnswerClicked() {
        console.log("You clicked the wrong answer!");
        
      },
    },
  
  /*,
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }*/
}
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
  background-color:cornsilk;

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