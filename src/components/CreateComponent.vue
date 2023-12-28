<template>

<div id="citySelector">
    

    <div id="questions">
    <!--{{ uiLabels.question }}-->


   <input  v-model="question"  placeholder=" Write your question">
   <div class="froggy" v-for="(_, i) in answers">
       
        <input  v-model="answers[i]" v-bind:key="'answer'+i" :class="{stylish: c===i}" placeholder="svar">
        <input class="rightanswerbutton" type = "radio"  v-bind:key="i" name="check" @change="selectedAnswerIndex(i)">
    
    </div>
    
    <button v-on:click="addAnswer">
    Add answer 
    </button>
    <button v-on:click="removeAnswer">
    Remove answer 
    </button></div>
  
    
    </div>
  

</template>

<script>
export default {

    props:{
        Question:Object
    },


 data: function () {
    
    return {
   question: "",
   answers: ["", ""],
   c: -1,
  }
},

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
    console.log(this.c)
    this.$emit('addThisQuestion', this.question,this.answers, this.c)
  }

}
}

  


</script>


<style>
#questions  {
display:flex;
  padding: 10px;
  border: 2px solid pink;
  border-radius: 8px;
  flex-direction: column;

  font-size: 1.5em;
  margin-top: 10px;
  background-color:floralwhite;
  outline: none; /* Detta tar bort den svarta bordern som kommer när i focus*/
  }

  button{
  padding: 7px;
  border: 2px solid pink;
  border-radius: 8px;
  font-size: 0.6em;
  margin-top: 10px;
  
  
  outline: none;

  
  background-color: plum;
  color: white;
  text-align: center;
  text-decoration: none;
  
  
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid pink;
  }

.stylish {
    border-color: red;
}
.froggy{
    display: flex;
    flex-direction: row;
}

#rightanswerbutton {
    display:flex;
    flex-direction: column;
  
}
</style>