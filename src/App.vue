<template>
  <div class='app'>
    <h1>
      Страница с постами
    </h1>
    <div class="app__buttons">
      <custom-button @click='showDialog'>
        Создать пост
      </custom-button>
      <custom-select
        v-model='selectedSort'
        :options='sortOptions'
      >
      </custom-select>
    </div>
    <custom-dialog v-model:show='dialogVisible'>
      <post-form
        @create='createPost'
      />
    </custom-dialog>
    <post-list
      :posts='posts'
      @remove='removePost'
      v-if='!loading'
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      loading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
        {value: 'id', name: 'По номеру'}
      ]
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
        this.loading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch(e) {
        console.log('Ошибка')
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    selectedSort(newValue) {
      console.log(newValue);
    },
    dialogVisible(newValue) {
      console.log(newValue);
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

.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

</style>