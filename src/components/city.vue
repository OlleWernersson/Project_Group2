<template>
    <p :class="citystyle" v-if="isSelected" v-on:click="select">{{ city.first_letter }}</p>
    {{ isSelected }}
</template>

<script>
export default{
    props:{
        city: Object
    },
    data:{
        isSelected: true,
    },
    methods: {
        select: function(){
            isSelected = !isSelected
        }
    }

}
</script>

<style>
    .citystyle{
        background-color: aqua;
        border-radius: 10px;
    }
</style>


