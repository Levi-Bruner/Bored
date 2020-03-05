<template>
  <div class="col-4 list">
    <button @click="deleteList">X</button>
    <h3>{{listData.title}}</h3>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="task..." v-model="title" required />
      <button type="submit">Create Task</button>
    </form>
    <TaskComp v-for="(task) in tasks" :key="task.id" :taskData="task" />
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
      return this.$store.dispatch("getTasksByListId", this.listData);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listData.id);
    }
  }
};
</script>

<style scoped>
</style>