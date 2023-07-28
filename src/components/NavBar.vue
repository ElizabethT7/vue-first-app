<template>
  <div class='navbar'>
    <div @click="$router.push('/')">Vue 3</div>
    <div class='navbar__btns'>
      <custom-button @click="$router.push('/posts')">Посты</custom-button>
      <custom-button @click="$router.push('/about')" style='margin-left: 10px'>О сайте</custom-button>
      <custom-button @click="$router.push('/store')" style='margin-left: 10px'>Store</custom-button>
      <custom-button @click="$router.push('/composition')" style='margin-left: 10px'>Composition</custom-button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow:  2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>