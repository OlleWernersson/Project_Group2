<template>
  <div id="map-container">
    <slot></slot>
    <canvas ref="mapContainer">
    </canvas>
  </div>
</template>

<script>
export default {
  props: {
    poll: Object,
  },
  data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0,
    };
  },
  computed: {
    mapBackground() {
      if (this.poll && this.poll.route) {
        return `../../public/img/${this.poll.route}.jpg`;
      } else {
        return '../../public/img/world.jpg';
      }
    },
  },
  mounted() {
    this.updateCanvasSize();
    window.addEventListener('resize', this.updateCanvasSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateCanvasSize);
  },
  methods: {
    updateCanvasSize() {
      const mapContainer = this.$refs.mapContainer;
      this.canvasWidth = mapContainer.clientWidth;
      this.canvasHeight = mapContainer.clientHeight;

      const canvas = this.$refs.mapContainer;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      this.drawMap();
    },
    drawMap() {
      const canvas = this.$refs.mapContainer;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = this.mapBackground;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
      };
    },
  },
};
</script>

<style scoped>
#map-container {
  position: relative;
  width: 100%;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
