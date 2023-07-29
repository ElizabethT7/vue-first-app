import {ref, computed} from 'vue';

export default function useSortedPosts(posts) {
  const selectedSort = ref('');
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post, postNext) => {
      return post[selectedSort.value]?.localeCompare(postNext[selectedSort.value])
    })
  });
  return {
    selectedSort, sortedPosts
  }
} 