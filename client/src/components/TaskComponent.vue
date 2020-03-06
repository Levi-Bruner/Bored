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
  <div>
    <h5>
      {{taskData.title}}
      <button @click="deleteTask">x</button>
    </h5>
    <select v-model="newId">
      <option v-for="list in lists" :key="list.id" :value="list.id">{{list.title}}</option>
    </select>
    <button @click="moveList">Move</button>
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
      content: "",
      newId: ""
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
      this.$store.dispatch("deleteTask", this.taskData);
    },
    moveList() {
      let newList = {
        boardId: this.taskData.boardId,
        oldListId: this.taskData.listId,
        listId: this.newId,
        id: this.taskData.id
      };
      this.$store.dispatch("moveList", newList);
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
    },
    lists() {
      return this.$store.state.lists;
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