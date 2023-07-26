<template>
  <nav-bar></nav-bar>
  <div class='app'>
   <router-view>  
   </router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
components: {
  NavBar
}
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  margin: 30px 0;
}

.app {
  padding: 20px;
}

.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}


</style>