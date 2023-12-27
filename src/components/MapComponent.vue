<template>
  <div id="map" :style="{ backgroundImage: mapBackground }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cities: Object,
    poll: Object,
  },
  data() {
    return {
      displayWrongSign: false,
    };
  },
  computed: {
  mapBackground() {
    if (this.poll && this.poll.route) {
      return `url('../../public/img/${this.poll.route}.jpg')`;
    } else {
      return `url('../../public/img/world.jpg')`;
    }
  },
},
  methods: {
    moveMeForward() {
      this.dotLeft = this.selectedcities[this.currentCity].left;
      this.dotTop = this.selectedcities[this.currentCity].top - 20;
      this.currentCity++;
    },
  },
};
</script>

<style scoped>
#map {
  /* background-image: url('../../public/img/world.jpg'); */
  background-position: center center; 
  background-size: cover; 
  width: 800px;
  height: 750px;
  position: relative;
  font-size: 2em;
}

#dots {
  background-color: rgba(119, 231, 219, 0.96);
  border-radius: 15px;
  position: absolute;
  font-size: 1em;
  width: 35px;
}
#cities{
  position: absolute;
}

#myCity {
  border: 10px;
}
</style>