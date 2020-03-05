<template>
  <div>
    {{commentData.content}}
    <button @click="deleteComment">x</button>
  </div>
</template>

<script>
export default {
  name: "CommentComp",
  props: ["commentData"],
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentData.id);
    }
  }
};
</script>

<style scoped>
</style>