<template>
  <div>
    <h1>
      Страница с постами
    </h1>
    <h2>{{ likes }}</h2>
    <custom-button @click="addLike">Like</custom-button>
<!--    <custom-input
    v-model='searchQuery'
    placeholder="Поиск..."
    v-focus
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
    <div v-intersection="loadMorePosts" class='observer'></div>-->
  </div>
</template>

<script>
import {ref} from 'vue';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},

      ]
    }
  },
  setup(props) {
    const likes = ref(2);
    console.log(likes)
    const addLike = () => {
      likes.value += 1;
    }

    return {
      likes,
      addLike
    };
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