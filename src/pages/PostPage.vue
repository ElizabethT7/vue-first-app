<template>
  <div>
    <h1>
      Страница с постами
    </h1>
    <custom-input
    v-model='searchQuery'
    placeholder="Поиск..."
    />
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
      :posts='sortedAndSearchedPosts'
      @remove='removePost'
      v-if='!loading'
    />
    <div v-else>Идет загрузка...</div>
    <div ref='observer' class='observer'></div>
<!--<div class='page__wrapper'>
      <div
        v-for='pageNumber in totalPage'
        :key='pageNumber'
        class='page'
        :class= "{
          'current-page': page === pageNumber
        }"
        @click='changePage(pageNumber)'
      >
        {{ pageNumber }}
      </div>
    </div>-->
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
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
        //{value: 'id', name: 'По номеру'}
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
    /*changePage(pageNumber) {
      this.page = pageNumber;
      this.fetchPosts()
    },*/
    async fetchPosts() {
      try {
        this.loading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch(e) {
        console.log('Ошибка')
      } finally {
        this.loading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch(e) {
        console.log('Ошибка')
      }
    },
  },
  mounted() {
    this.fetchPosts();
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries) => {
      console.log('пересечение');
      console.log(entries);
      if(entries[0].isIntersecting && this.page < this.totalPage) {
        console.log('пересечен');
        this.loadMorePosts(); //если использовать function(131 стр) произойдет потеря контекста
      }
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: { //не мутирует
    sortedPosts() {
      return [...this.posts].sort((post, postNext) => {
        return post[this.selectedSort]?.localeCompare(postNext[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    /*page() {
      this.fetchPosts();
    }*/
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