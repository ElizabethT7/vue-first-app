<template>
  <div class='app'>
    <h1>
      Страница с постами
    </h1>
    <custom-button @click='fetchPosts' type='text' v-model.number='modificatorValue'>
      Получить посты
    </custom-button>
    <custom-button class='post__button' @click='showDialog'>
      Создать пост
    </custom-button>
    <custom-dialog v-model:show='dialogVisible'>
      <post-form
        @create='createPost'
      />
    </custom-dialog>
    <post-list
      :posts='posts'
      @remove='removePost'
    />
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import CustomButton from '@/components/UI/CustomButton';

export default {
  components: {
    PostForm, PostList, CustomButton
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: '',
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch(e) {
        console.log('Ошибка')
      }
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.post__button {
  margin: 20px 0;
}

</style>