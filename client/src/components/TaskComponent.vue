<template>
  <div>
    <h5>
      {{taskData.title}}
      <button @click="deleteTask">x</button>
    </h5>
    <CommentComp v-for="comment in comments" :key="comment.id" :commentData="comment" />
  </div>
</template>

<script>
import CommentComp from "./CommentComponent";
export default {
  name: "TaskComp",
  mounted() {
    return this.$store.dispatch("getCommentsByTaskId", this.taskData);
  },
  props: ["taskData"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData.id);
    }
  },
  components: {
    CommentComp
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskData.id];
    }
  }
};
</script>

<style scoped>
</style>