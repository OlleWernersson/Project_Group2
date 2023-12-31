<template>
  <div id = wrapper>
    <div id = question> {{question.q}} </div>
    {{wrongOrRight}}
    <div id = buttonWrapper>
      <button v-for="(a,index) in question.a" v-bind:key="index" @click="checkCorrectAnswer(index)"> 
      {{a}} </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: Object,
  },

    data: function () {  
     return {    
     wrongOrRight:"",
     }
  },

  methods: {
     checkCorrectAnswer(index) {
       if (this.question.c === index) {
          this.wrongOrRight="RÄTT SVAR"
          this.$emit('correctAnswerClick') 

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
  grid-template-rows: 20% 1fr 1fr;
  height: 20vh;
  width: 100vw;
}

#question {
  margin: 0;
  font-size: 1.7em;
  text-align: center;
  line-height: 1.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#buttonWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  justify-content: center;
}

button {
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