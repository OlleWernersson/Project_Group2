<template>    
    <p class="citystyle" :style="{left: city?.left + 'px',top:city?.top  + 'px'}" >{{ city?.name }}</p>

</template>

<script>
export default{
    props:{
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
    .citystyle{
        background-color: aqua;
        border-radius: 10px;
        position: absolute;
    }
</style>


