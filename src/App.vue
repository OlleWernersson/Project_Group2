<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600&family=Varela+Round&display=swap');

main, h1, h2, h3 {
font-family: 'Fredoka', sans-serif;
font-family: 'Varela Round', sans-serif;

}

main, label {
font-family: 'Varela Round', sans-serif;

}
.main-button { /* Alla Veiws kan använda denna knapp style*/
  display: inline-block;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: plum;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid pink;
}

html {
  margin: 0;
  padding: 0;
  height: 100%;
  background: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);

}
</style>
