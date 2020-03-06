<template>
  <div>
    <h5>
      {{taskData.title}}
      <button @click="deleteTask">x</button>
    </h5>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >More</button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </div>
    <form @submit.prevent="addComment">
      <input type="text" placeholder="comment..." v-model="content" required />
      <button type="submit">Submit</button>
    </form>
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
  data() {
    return {
      content: ""
    };
  },
  props: ["taskData"],
  methods: {
    addComment() {
      let newComment = {
        content: this.content,
        creatorEmail: this.user.email,
        taskId: this.taskData.id,
        listId: this.taskData.id,
        boardId: this.taskData.boardId
      };
      this.$store.dispatch("addComment", newComment);
      this.content = "";
      return this.$store.dispatch("getCommentsByTaskId", this.taskData);
    },
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
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
</style>