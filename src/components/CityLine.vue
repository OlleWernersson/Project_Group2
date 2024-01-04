<template>
  <svg class="city-line" :style="{ transform: `translate(${scrollX}px, ${scrollY}px)` }">
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
  data() {
    return {
      scrollX: 0,
      scrollY: 0,
    };
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
  mounted() {
    this.$parent.$el.addEventListener('scroll', this.updateScrollPosition);
  },
  beforeDestroy() {
    this.$parent.$el.removeEventListener('scroll', this.updateScrollPosition);
  },
  methods: {
    updateScrollPosition() {
      this.scrollX = -this.$parent.$el.scrollLeft;
      this.scrollY = -this.$parent.$el.scrollTop;
    },
    getCurvedLinePath() {
      const startX = this.cityPosition.x;
      const startY = this.cityPosition.y;
      const endX = this.nextCityPosition.x;
      const endY = this.nextCityPosition.y;

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
