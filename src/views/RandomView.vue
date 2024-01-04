<template> 
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
  </div>
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
        console.log("kommer vi till sendPlayerList i randomView???")
        console.log("i updated i randomView så är players", players)
        });

    },


    methods: {
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
