<template>
  <div class="id-box">ID: {{ id }}</div>
</template>

<script>
export default {
  props: {
    id: String,
  },
};
</script>

<style scoped>
.id-box {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  padding: 10px;
  border: 2px solid #ccc;
}
</style>
