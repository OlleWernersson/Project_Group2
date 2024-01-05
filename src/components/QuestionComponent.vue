<template>
  <div id="wrapper">
    <div id="question-container" v-if="question">
      <div id="question">{{ question.q }}</div>
      <div id="buttonWrapper">
        <button
          v-for="(a, index) in question.a"
          :key="index"
          @click="checkCorrectAnswer(index)"
          :disabled="this.participant.countdown > 0"
          class="main-button"
        >
          {{ a }}
        </button>
      </div>
    </div>
    <div v-if="this.participant.countdown >= 0" class="countdown-overlay">
      <div class="countdown">{{ this.participant.countdown }}</div>
    </div>
  </div> 
  {{ participant }}
  {{ this.isInCountdown }}

</template>

<script>
import { ssrContextKey } from 'vue';
import { sockets } from '../../server/sockets';
import { Socket } from 'socket.io-client';

export default {
  name: 'QuestionComponent',
  props: {
    question: {
      type: Object,
      default: () => ({ q: '', a: [], c: null }),
    },
    participant: {
      type: Object,
      default: () => ({a:"", countdown: 0})
    },
  },

    data: function () {  
      return {
        wrongOrRight: '',
      isInCountdown: this.getCountdown()
    };
  },
  watch:{
  "participant.countdown": function(newvalue, oldvalue){
    console.log(newvalue,oldvalue, "i watcher")
    if(oldvalue === 0){
    this.startCountdown()
    }
  }
  },
  methods: {
    checkCorrectAnswer(index) {
      if (this.question.c === index) {
          this.wrongOrRight="RÄTT SVAR"
          this.$emit('correctAnswerClick') 

      }
      else {
        this.wrongOrRight = 'FEL SVAR';
        this.setCountdown();
        this.$emit('wrongAnswerClick')
      }
      
    },
    setCountdown(){
      this.$emit('setMaxCountdown')
      this.startCountdown();
    },
    getCountdown(){
      
      if(this.participant.countdown > 0){
        this.startCountdown()       
        return true
      }
      else{
        return false;
        console.log("hejhej")
      }
      
    },
    startCountdown() {
      //this.$emit('setMaxCountdown')
      console.log("från mounted till intervall")
      const countdownInterval = setInterval(() => {
          if(this.participant.countdown > 0){
        //socket.emit('updateCountdown',participant.name, pollId)
        console.log(countdownInterval)
        this.$emit('minusOneCountdown')
         // this.countdown -= 1; 
        } else {
        clearInterval(countdownInterval);
        //socket.emit('resetCountdown', participant.name, pollId)
        this.$emit('resetCountdown')
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
  background-color: rgba(0, 0, 0, 1);
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
    padding: 0em;
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