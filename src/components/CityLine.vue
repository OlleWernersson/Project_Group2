<template>
  <svg class="city-line">
    <path v-if="nextCity" :d="getCurvedLinePath()" fill="transparent" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
  </svg>
</template>

<script>
export default {
  props: {
    city: Object,
    nextCity: Object,
    mapSize: Object,
  },
  computed: {
    cityPosition() {
      if (this.mapSize && this.city) {
        const relativeX = (this.city.left / 800) * this.mapSize.width;
        const relativeY = (this.city.top / 760) * this.mapSize.height;

        return {
          x: relativeX,
          y: relativeY,
        };
      } else {
        return { x: 0, y: 0 };
      }
    },
    nextCityPosition() {
      if (this.mapSize && this.nextCity) {
        const relativeX = (this.nextCity.left / 800) * this.mapSize.width;
        const relativeY = (this.nextCity.top / 760) * this.mapSize.height;

        return {
          x: relativeX,
          y: relativeY,
        };
      } else {
        return null;
      }
    },
  },
  methods: {
    getCurvedLinePath() {
      const startX = this.cityPosition.x;
      const startY = this.cityPosition.y;
      const endX = this.nextCityPosition.x;
      const endY = this.nextCityPosition.y;

      // Control point for the quadratic Bezier curve
      const controlX = (startX + endX) / 2;
      const controlY = startY;

      return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
    },
  },
};
</script>

<style scoped>
.city-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
