<template>
  <div>
    <h1>GameResultView!</h1>
    <ul>
      <li v-for="(participant, index) in sortedParticipants" :key="index">
        {{ participant.name }} - City: {{ participant.city }}
      </li>
    </ul>
  </div>
</template>

<script>

import io from 'socket.io-client';
const socket = io("localhost:3000");

export default {
  name: 'GameResultView',
  data: function () {
    return {
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",
      pollId:"",
      poll: {},
    };
  },
  created: function () {
    this.pollId = this.$route.params.id
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
    socket.emit('joinPoll', this.pollId)
    socket.emit('getPoll', this.pollId)

    socket.on('thisPoll', poll =>
    this.poll = poll
    )


  },
  methods: {
  },
  computed: {
    sortedParticipants() {
      return this.poll.participants.slice().sort((a, b) => b.city - a.city);
    },
  },
};
</script>

<style scoped>

</style>
