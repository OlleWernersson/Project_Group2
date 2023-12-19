<template>
    <p> HEJJ</p>
    
    <p class="citystyle" v-for="city in cities" :key="city.name">{{ city.name }}</p>

</template>

<script>
export default{
    props:{
        cities: Object
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
    .citystyle{
        background-color: aqua;
        border-radius: 10px;
    }
</style>


