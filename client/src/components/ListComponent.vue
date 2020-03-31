<template>
  <div class="col-12 col-md-4 list-style">
    <h2>
      {{listData.title}}
      <button class="btn-delete-list" @click="deleteList">X</button>
    </h2>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="task..." v-model="title" required />
      <button type="submit">Create Task</button>
    </form>
    <TaskComp v-for="task in tasks" :key="task.id" :taskData="task" />
  </div>
</template>

<script>
import TaskComp from "./TaskComponent";
export default {
  name: "ListComp",
  data() {
    return {
      title: ""
    };
  },
  props: ["listData"],
  mounted() {
    return this.$store.dispatch("getTasksByListId", this.listData);
  },
  components: {
    TaskComp
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    addTask() {
      let newTask = {
        title: this.title,
        creatorEmail: this.user.email,
        listId: this.listData.id,
        boardId: this.listData.boardId
      };
      this.$store.dispatch("addTask", newTask);
      this.title = "";
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listData.id);
    }
  }
};
</script>

<style scoped>
.btn-delete-list {
  background-color: darkred;
  color: silver;
  font-size: 1rem;
}

.btn-delete-list:hover {
  background-color: red;
}

.list-style {
  padding-top: 5px;
  margin-bottom: 3px;
  border: solid 2px black;
  border-radius: 8px;
  background-color: darkgray;
}
</style>