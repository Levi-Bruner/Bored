<template>
  <div class="task-style">
    <fieldset class="fieldset-task">
      <h5>
        {{taskData.title}}
        <button class="btn-delete-task" @click="deleteTask">DELETE TASK</button>
      </h5>
      <form @submit.prevent="addComment">
        <input type="text" placeholder="comment..." v-model="content" required />
        <button type="submit">Submit</button>
      </form>
      <CommentComp v-for="comment in comments" :key="comment.id" :commentData="comment" />
    </fieldset>
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
    },
    deleteTask() {
      //this.$store.dispatch("deleteTask", this.taskData.id);
      //debugger;
      this.$store.dispatch("deleteTask", this.taskData);
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
.btn-delete-task {
  background-color: darkred;
  color: silver;
  font-size: 0.8rem;
}

.btn-delete-task:hover {
  background-color: red;
}

.task-style {
  background-color: lightskyblue;
}
.fieldset-task {
  border: solid 2px black;
}
</style>