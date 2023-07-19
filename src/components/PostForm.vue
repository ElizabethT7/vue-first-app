<template>
  <form @submit.prevent> /*отменяем действие по умолчанию*/
    <h4>Создание поста</h4>
    <input
        v-bind:value='post.title'
        @input='inputTitle'
        class='post__input'
        type='text'
        placeholder='Название'
      >  
      <input
        v-bind:value='post.body'
        @input='post.body = $event.target.value'
        class='post__input'
        type='text'
        placeholder='Описание'
      >
      <button class='button' @click='createPost'>Создать</button>
  </form>  
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    inputTitle(event){
      this.post.title = event.target.value;
    }
  }
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.post__input{
  width: 100%;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 10px 15px;
  margin-top: 6px;
}

.button {
  margin-top: 10px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 5px;
  cursor: pointer;
}
</style>