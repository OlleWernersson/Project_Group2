<template>
  <div id="map-container">

    <slot name="city-lines" class="city-lines"></slot>
    <slot name="cities" class="cities"></slot>

    <canvas ref="mapContainer"></canvas>
    
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
      imageAspectRatio: 1,
    };
  },
  computed: {
    mapBackground() {
      console.log(this.poll, this.poll.route)
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
      this.canvasHeight = mapContainer.clientHeight;
      this.canvasWidth = this.canvasHeight / this.imageAspectRatio;

      const canvas = this.$refs.mapContainer;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      this.drawMap();
      this.$emit('mapSizeChanged', {
        width: this.canvasWidth,
        height: this.canvasHeight,
        offset: canvas.getBoundingClientRect(),
      });
    },
    drawMap() {
      const canvas = this.$refs.mapContainer;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = this.mapBackground;
      img.onload = () => {
        this.imageAspectRatio = img.width / img.height;
        ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
      };
    },
  },
};
</script>

<style scoped>
#map-container {
  position: relative;
  /* width: 100%; */
}

canvas {
  /* display: block; */
/*   width: 100%;
  height: 100%; */
}
</style>
