import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
    loading: false,
    selectedSort: '',
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPage: 0,
    sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По описанию'},
    ]
  }),
  getters: { //computed свойства
    sortedPosts(state) {
      return [...state.posts].sort((post, postNext) => {
        return post[state.selectedSort]?.localeCompare(postNext[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    }
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch(e) {
        console.log('Ошибка')
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch(e) {
        console.log('Ошибка');
      }
    }
  },
  namespased: true
}