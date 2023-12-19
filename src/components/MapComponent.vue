<template>
  <div id="map">
      <div id="dots" :style="{ left: dotLeft + 'px', top: dotTop + 'px' }">T</div>

      <p id="cities" v-for="city in cities" :key="city.name" :style="{left: city.left + 'px',top:city.top  + 'px'}" >{{ city.name }} </p>

    </div>

</template>

<script>

import City from '../components/CityComponent.vue';
  export default {
    props:{
        cities: Object
    },
      data() {
          return {
          displayWrongSign: false
          }
      },

      methods: {
      moveMeForward() {
          this.dotLeft = this.selectedcities[this.currentCity].left;
          this.dotTop = this.selectedcities[this.currentCity].top -20;
          this.currentCity++;
      },
      },
  }
</script>

<style scoped>
#map {
  background-image: url('../../public/img/europakarta.jpg');
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