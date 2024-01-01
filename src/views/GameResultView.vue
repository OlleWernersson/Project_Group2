<template>
 <h1>GameResultView!</h1>
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
    };
  },
  created: function () {
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels;
    });
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
