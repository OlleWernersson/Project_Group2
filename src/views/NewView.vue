<template>
    <div>
      {{pollId}}
      <input type="text" v-model="userName">
      <button v-on:click="submitUserName">patricipate</button> 
      {{ playerList }}

    </div>
  </template>
  
  <script>
  
  import io from 'socket.io-client';
  const socket = io("localhost:3000");
  
  export default {
    name: 'NewView',
    data: function () {
      return {
        pollId: "inactive poll",
        userName: "",
        playerList:[]
      }
    },
    created: function () {
      this.pollId = this.$route.params.id
      socket.emit('joinPoll', this.pollId)
      socket.on("lobbyUpdate", (players) => {
      console.log("nu är vi framme")
      this.playerList = players;
    });
    },
    methods: {
      submitUserName: function () {
        socket.emit("joinPoll", {pollId: this.pollId, answer: this.userName})
      }
    }
  }
  </script>
  