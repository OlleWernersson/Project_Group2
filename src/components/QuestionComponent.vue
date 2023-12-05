<template>
  <div> This is a question, choose your answer! </div>
  <div>
    <button> Correct Answer!</button>
    <button> Wrong Answer</button>
    <button> Wrong Answer</button>
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
  }
  
  /*,
  emits: ["answer"],
  methods: {
    answer: function (answer) {
      this.$emit("answer", answer);
    } 
  }*/
}
</script>