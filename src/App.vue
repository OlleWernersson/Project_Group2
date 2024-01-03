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

.main-button {
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: plum;
  text-align: center;
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid pink;
  font-family: 'Varela Round', sans-serif;

}
.main-button:hover {
  background-color: rgb(208, 153, 208);
}

.supportButtons {
  margin-left: 4%;
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: rgb(155, 223, 243);
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid #ffc1c8;
  font-family: 'Varela Round', sans-serif;
}

.supportButtons:hover {
  background-color: rgb(138, 211, 233);
}

.edit-button{
  padding: 1em 2em;
  font-size: 1.2em;
  background-color: floralwhite;
  text-align: center;
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid rgb(241, 234, 234);
  font-family: 'Varela Round', sans-serif;
}

.edit-button:hover {
  background-color: rgb(239, 234, 225);
}

html {
  margin: 0;
  padding: 0;
  height: 100%;
  background: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
}
</style>
