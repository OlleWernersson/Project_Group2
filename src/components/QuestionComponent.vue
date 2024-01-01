<template>
  <div id="wrapper">
    <div id="question">{{ question.q }}</div>
    {{ wrongOrRight }}
    <div id="buttonWrapper">
      <button
        v-for="(a, index) in question.a"
        :key="index"
        @click="checkCorrectAnswer(index)"
        :disabled="countdown > 0"
      >
        {{ a }}
      </button>
    </div>
    <div v-if="countdown > 0" class="countdown-overlay">
      <div class="countdown">{{ countdown }}</div>
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
        wrongOrRight: '',
        countdown: 0,
    };
  },

  methods: {
    checkCorrectAnswer(index) {
      if (this.question.c === index) {
          this.wrongOrRight="RÄTT SVAR"
          this.$emit('correctAnswerClick') 

      }
      else {
        this.wrongOrRight = 'FEL SVAR';
        this.startCountdown();
      }
      
    },
    startCountdown() {
      this.countdown = 5;
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1; 
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    },
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
  position: relative;
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
.countdown-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.countdown {
  font-size: 2em;
  color: white;
}

</style>