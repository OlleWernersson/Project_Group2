<template>
  <div class="cityLine-wrapper">
    <svg class="city-line" :style="{ transform: `translate(${scrollX}px, ${scrollY}px)` }">
      <path v-if="nextCity" :d="getCurvedLinePath()" fill="transparent" stroke="black" stroke-width="2" stroke-dasharray="5,5" />
    </svg>
  </div>
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
      if (this.mapSize && this.city && this.mapSize.offset) {
        const relativeX = (this.city.left / 800) * this.mapSize.width + this.mapSize.offset.x;
        const relativeY = (this.city.top / 760) * this.mapSize.height + this.mapSize.offset.y;

        return {
          x: relativeX,
          y: relativeY,
        };
      } else {
        return { x: 0, y: 0 };
      }
    },
    nextCityPosition() {
      if (this.mapSize && this.nextCity && this.mapSize.offset) {
        const relativeX = (this.nextCity.left / 800) * this.mapSize.width + this.mapSize.offset.x;
        const relativeY = (this.nextCity.top / 760) * this.mapSize.height + this.mapSize.offset.y;

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
    if (this.$parent.$el) {
      this.$parent.$el.addEventListener('scroll', this.updateScrollPosition);
    }
  },
  beforeDestroy() {
    this.$parent.$el.removeEventListener('scroll', this.updateScrollPosition);
  },
  methods: {
    updateScrollPosition() {
/*       this.scrollX = -this.$parent.$el.scrollLeft;
      this.scrollY = -this.$parent.$el.scrollTop; */
      this.scrollX = 0
      this.scrollY = 0
    },
    getCurvedLinePath() {
      const cityPosition = this.cityPosition;
      const nextCityPosition = this.nextCityPosition;

      if (!cityPosition || !nextCityPosition) {
        return '';
      }

      const startX = cityPosition.x;
      const startY = cityPosition.y;
      const endX = nextCityPosition.x;
      const endY = nextCityPosition.y;

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
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
