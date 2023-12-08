<template>
    <div id="wrapper">
      <div> 
        <Map>
          <area shape="rect" coords="0, 0, 100, 100">
        </Map> 
      </div>
     
      <div> <Question id = "buttonWrapper" :question = "question"/> </div> 
    
    </div>
  </template>
  
  <script>
  import Question from '../components/QuestionComponent.vue';
  import Map from '../components/MapComponent.vue';

  export default {
    components: { Question, Map},
    props: ['id'],
    data() {
      return {
        question: 'This is a question, whats your answer?'
        };
    },
  };
  </script>
  
  <style>
  #wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  </style>
  