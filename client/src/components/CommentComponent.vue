<template>
  <div>{{commentData.content}}</div>
</template>

<script>
export default {
  name: "CommentComp",
  props: ["commentData"]
};
</script>

<style scoped>
</style>