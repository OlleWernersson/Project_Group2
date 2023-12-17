<template>
  <div id="map">
      <div id="dots" :style="{ left: dotLeft + 'px', top: dotTop + 'px' }">T</div>
      <div id="cities" v-for="city in selectedcities" :style="{left: city.left + 'px',top:city.top  + 'px'}"> {{ city.Bletter }}</div>
    </div>
</template>

<script>
  export default {
      data() {
          return {
          dotTop: 100,
          dotLeft: 500,
          displayWrongSign: false,
          cityLeft: 500,
          cityTop: 200,
          selectedcities:[
              {top:500, left:200, Bletter: 'A'},
              {top:100, left:200, Bletter: 'B'},
              {top:200, left:500, Bletter: 'C'}
          ],
          currentCity: 0,
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
  position:absolute;
}
</style>