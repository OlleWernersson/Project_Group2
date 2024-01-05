

<template> 
<transition name="toast">
  <Toast v-if="showToast"/>
</transition>

<transition name="train">
  <div v-if="showTrain"> 
    <img :src="('../public/train.gif')" id="train">
     </div> 
    <!-- <img src="../public/train.gif" width="512" height="512" id="train"> -->
</transition> 
<button @click="showTrain=!showTrain"></button>
  <!-- <div>
    <audio ref="audio" src="../public/buzzer.mp3"></audio>
    <button @click="playSound">Spela ljud</button>
  </div>

<button @click="getPlayerList"> get Players</button> 
<button @click="drawPlayers"> draw players</button> 


{{playerList}}
    <div class="map" v-on:click="setLocation">  
      <div v-bind:style="{left: location.x + 'px', top: location.y + 'px' }" >
      </div>
      <div class="airPlaneDiv"></div>
    </div>
    <div class = playerWrapper>
    <PlayerList :players="playerList" />
  </div> -->



</template> 

<script>
import io from 'socket.io-client';
const socket = io(sessionStorage.getItem("dataServer"));
import PlayerList from '@/components/PlayerList.vue';



export default {
  name: 'randomView',
  components: {
    PlayerList,
  },
  data: function () {
    return {
      showTrain: false, 
        gameID: "",
        location: { x: 0,
                    y: 0
                  },
        playerList:[], 
        uiLabels: {}, 
        lang: localStorage.getItem("lang") || "en",

      }
    },

    created: function () {
        this.gameID = this.$route.params.id
        console.log(this.gameID)
        socket.emit("pageLoaded", this.lang);
        
        socket.on("init", (labels) => {
        this.uiLabels = labels;
        });
        

    },

    updated:function() {
        socket.on("sendPlayerList", (players) => {
        this.playerList = players;


        });

    },


    methods: {
        playSound() {
              const audio = this.$refs.audio;
              audio.play();
        },
        setLocation: function (event){
            var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
            this.location.x = event.clientX - 10 - offset.x;
            this.location.y = event.clientY - 10 - offset.y;
            console.log(this.location)
            console.log(this.playerList)
            //drawLocation(location)
            },
        // drawLocation: function(location) {

        // }
        getPlayerList: function () {
        socket.emit("getPlayerList", this.gameID)
        }, 

        drawPlayers: function () {
         for (let i = 0; i < this.playerList.length; i++) { 
         console.log(this.playerList[i].color);

         }
         }
         }
  }
</script>

<style scoped>

.toast-enter-from{
  opacity: 0;
  transform:translateX(-60px)
}

.toast-enter-to{
  opacity: 0;
  transform:translateX(-60px)
}

.toast-enter-active {
  transition: all 0.5s ease;
}

.toast-leave-to {
  opacity: 0;
  transform:translateX(-60px)
}

.toast-leave-active {
  transition: all 0.5s ease;
}


#trainID {
width: 50%;
}

.train-enter-from{
opacity: 0;
transform:translateX(-60px)
}

.train-enter-active {
  transition: all 5s ease;
}

.train-leave-to {
  opacity: 0;
  transform:translateX(-60px)
}

.train-leave-active {
  transition: all 5s ease;
}

.map {
  width: 1920px;
  height: 1728px; 
  background: url("../public/img/1.jpg");
}

.airPlaneDiv {   
position: absolute;
width: 1920px;
height: 1728px;  
background: url("../public/img/AirplanePic.png");
background-color: transparent;
}

</style>
