<template>
  <div class='post'>
    <div>
      <div>{{ post.id }}</div>
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
    <div class='post__buttons'>
      <custom-button
        @click="$emit('remove', post)"
      >
        Удалить
      </custom-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__buttons {
  color: teal;
}

</style>