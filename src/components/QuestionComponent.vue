<template>
  <div id="wrapper">
    <div id="question-container" v-if="question">
      <div id="question">{{ question.q }}</div>
      <div id="buttonWrapper">
        <button
          v-for="(a, index) in question.a"
          :key="index"
          @click="checkCorrectAnswer(index)"
          :disabled="countdown > 0"
          class="main-button"
        >
          {{ a }}
        </button>
      </div>
    </div>
    <div v-if="countdown >= 0" class="countdown-overlay">
      <div class="countdown">{{ countdown }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionComponent',
  props: {
    question: {
      type: Object,
      default: () => ({ q: '', a: [], c: null }),
    },
  },

    data: function () {  
      return {
        wrongOrRight: '',
        countdown: -1,
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
        this.$emit('wrongAnswerClick')
      }
      
    },
    startCountdown() {

      this.countdown = 5;
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1; 
        } else {
          clearInterval(countdownInterval);
          this.countdown = -1
        }
      }, 1000);
    },
  }
}
</script>

<style scoped> 

#wrapper {
  position: relative;
}
/* #question-container { 
  display: flex;
  flex-direction: column;
} */
#question {
  font-size: 1.7em;
  line-height: 1.5em;
}

/* #buttonWrapper {
} */
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
@media screen and (max-width: 768px), (max-height: 700px) {
  #question {
    font-size: 1.2em;
  }

  button {
    font-size: 1em;
    padding: 0.8em 1.5em;
  }
}

@media screen and (max-width: 480px), (max-height: 500px) {
  #question {
    font-size: 1em;
  }

  button {
    font-size: 0.8em;
    padding: 0.6em 1.2em;
  }
}
@media screen and (max-height: 400px) {
  #question {
    font-size: 0.8em;
  }

  button {
    font-size: 0.6em;
    padding: 0em 0.6em;
  }
}
@media screen and (min-aspect-ratio: 2/1) {

}
</style>