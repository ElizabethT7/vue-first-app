<template>
  <div>
    <h1>
      Страница с постами
    </h1>
    <custom-input
      :model-value='searchQuery'
      @update:model-value='setSearchQuery'
      placeholder="Поиск..."
      v-focus
    />
    <div class="app__buttons">
      <custom-button @click='showDialog'>
        Создать пост
      </custom-button>
      <custom-select
        :model-value='selectedSort'
        @update:model-value='setSelectedSort'
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
      :posts='sortedAndSearchedPosts'
      @remove='removePost'
      v-if='!loading'
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class='observer'></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
  },
  mounted() {
    //this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      loading: state => state.post.loading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPage: state => state.post.totalPage,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  }
}
</script>

<style>

.app__buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid rgb(59, 59, 59);
  border-radius: 4px;
  padding: 10px;
  margin: 0 5px;
}

.current-page {
  border: 1px solid teal;
  background-color: teal;
  color: white;
}

.observer {
  height: 30px;
  background: gray;
}

</style>