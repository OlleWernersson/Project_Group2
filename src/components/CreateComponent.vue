<template>
    <div id="questions">
     
      <input class="write" v-model="question"  placeholder= "Write your question">

      <div class="froggy" v-for="(_, i) in answers">
        <input class="write" v-model="answers[i]" v-bind:key="'answer'+i" :class="{stylish: c===i}" placeholder="svar">
        <input class="rightanswerbutton" type = "radio"  v-bind:key="i" name="check" @change="selectedAnswerIndex(i)">
      </div>
      
      <div class = "buttonWrapper">
          <button v-on:click="addAnswer" class = "edit-button">
            Add answer
            <!-- {{uiLabels.addAnswer}} -->
          </button>
          <button v-on:click="removeAnswer" class = "edit-button">
            Remove Answer
            <!-- {{uiLabels.removeAnswer}} -->
          </button>
        </div>
    </div>

</template>

<script>
// import io from 'socket.io-client';

export default {
    props:{
        Question: Object
    },

 data: function () {
    return {
      question: "",
      answers: ["", ""],
      c: -1,
      // lang: localStorage.getItem("lang") || "en",
      // uiLabels: {},

  }
},

// created: function() {
//   socket.on("init", (labels) => {
//   this.uiLabels = labels
//   })
// },

methods: {
  addAnswer: function () {
  this.answers.push("");
  },
  removeAnswer: function() {
  this.answers.pop("")
  },
  selectedAnswerIndex: function (i) {
  this.c=i
  },
  addQuestion: function(){
    console.log(this.c);
    this.$emit('addThisQuestion', this.question, this.answers, this.c);
    this.question = "";
    this.answers = ["", ""];
    this.c = -1;
  }

}
}
</script>

<style scoped>
  #questions {
    display:flex;
    padding: 10px;
    border: 2px solid pink;
    border-radius: 8px;
    flex-direction: column;
    font-size: 1.5em;
    margin-top: 10px;
    background-color:#ebe4f7;
    outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  }

  button {
    padding: 7px;
    border-radius: 8px;
    font-size: 0.6em;
    margin-top: 1px;
    outline: none;
    margin: 0.5em;
    cursor: pointer;
    border-radius: 8px;
  }

  .stylish {
    border-color: rgb(57, 221, 36);
  }
  .froggy{
      display: flex;
      flex-direction: row;
  }

  #rightanswerbutton {
    display:flex;
    flex-direction: column;
  }

  input {
    padding: 5px;
    border: 2px solid pink;
    border-radius: 8px;
    background-color:floralwhite;
    outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
    margin: 0.5em;
    border: 2px solid pink;
    font-size: 0.6em;
    margin-top: 1px;
  }

  input:focus {
    background-color: white;
  }

  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
  }
</style>