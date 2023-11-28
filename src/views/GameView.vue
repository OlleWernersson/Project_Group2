<template >
    <div id="background">
        <button @click="moveMeForward"> Click me! </button>
        <p>hej</p>
        <div id = "dots" :style="{ left: dotLeft + 'px', top: dotTop + 'px' }">
            T
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            dotTop: 100,
            dotLeft: 500, 

        }
    },

    methods: {
        moveMeForward() {
            console.log("You clicked me!"),
            this.dotLeft += 10;
            this.dotTop += 0
        }
    }

}
</script>
<style>
#background{
    background-image: url('polacks.jpg');
    width: 50em; 
    height: 26em; 
    position: absolute;
    font-size: 2em;
}


#dots {
    background-color: blue;
    border-radius: 15px;
    position: absolute;
    font-size: 1em;
}
</style>