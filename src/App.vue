<template>
  <div>
    Work hello !
    <button>Click me!</button>
    <button v-on:click='addLike'>Like</button>
    <button @click='addDislike'>Dislike</button>
    <div>Likes count is <strong>{{ likes }}</strong></div>
    <div>Dislikes count is <strong>{{ dislikes }}</strong></div>
    <input type='text'>
    <textarea name='' cols='30' rows='10'></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 5,
      dislikes: 0,
    }
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike(){
      this.dislikes += 1;
    }
  }
}
</script>

<style>

</style>