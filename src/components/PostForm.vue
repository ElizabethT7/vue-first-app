<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <custom-input
        v-model='post.title'
        class='post__input'
        type='text'
        placeholder='Название'
      />  
      <custom-input
        v-model='post.body'
        class='post__input'
        type='text'
        placeholder='Описание'
      />
      <custom-button class='form__button' @click='createPost'>Создать</custom-button>
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
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post, 'second param', ' 3 param');
      this.post = {
        title: '',
        body: '',
      }
    },
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
  margin-top: 6px;
}

.form__button {
  margin-top: 10px;
  align-self: flex-end;
}
</style>