<template>
  <div id="wrapper">
    <div id="question">{{ question.q }}</div>
    <!-- {{ wrongOrRight }} -->
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
  grid-template-rows: 1fr 1fr;
  height: 100%;
  width: 100%;
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
  justify-self: center;
}

#buttonWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  gap: 10px;
  justify-content: center;
}

/* button {
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
  #wrapper {
    grid-template-rows: auto 1fr auto;
  }
  #question {
    order: 1; /* Change order of question element */
  }
  #buttonWrapper {
    order: 2;
    grid-template-rows: repeat(auto-fit, minmax(1fr, 0px));
}

}
</style>