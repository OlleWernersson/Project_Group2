<template>    
  <div class="city-circle" :style="{ left: city?.left + 'px', top: city?.top + 'px' }">
    <p class="city-name">{{ city?.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    city: Object
  },
  data() {
    return {
      isSelected: true,

    };
  },
  methods: {
    select: function () {
      this.isSelected = !this.isSelected;
    },
  },
}
</script>

<style>

.city-circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: aqua;
  border-radius: 50%;
}

.city-name {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: -20px;
  font-size: small;
  
}
</style>


