<template>
  <div class='post' v-for="post in posts">
    <div>
      <strong>
        Название:
      </strong>
      {{ post.title }}
    </div>
    <div>
      <strong>
        Описание:
      </strong>
      {{ post.body }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 12px;
  border: 2px solid teal;
  border-radius: 5px;
  margin-top: 20px;
}

</style>