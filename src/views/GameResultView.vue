<template>
  <div>
    <h1>Spelresultat: </h1>
    <ul>
      <PlayerList :players="sortedParticipants" result = "true"/>
    </ul>
  </div>
</template>

<script>

import io from 'socket.io-client';
import PlayerList from '@/components/PlayerList.vue';
const socket = io("localhost:3000");

export default {
  name: 'GameResultView',
  components: {PlayerList},
  data: function () {
    return {
      uiLabels: {},
      lang: localStorage.getItem("lang") || "en",
      pollId:"",
      poll: {},
      sortedParticipants: [],
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
      this.sortedParticipants = this.poll.participants.slice().sort((a, b) => b.city - a.city);
      return this.poll.participants.slice().sort((a, b) => b.city - a.city);
    },
  },
};
</script>

<style scoped>

</style>
