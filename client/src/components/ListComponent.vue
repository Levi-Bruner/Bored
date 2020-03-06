<template>
  <div class = "row list-style">
  <div class="col-12 col-md-12">
  <fieldset class = "fieldset-list">
    <h3>
      {{listData.title}}
      <button class = "btn-delete-list" @click="deleteList">DELETE LIST</button>
    </h3>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="task..." v-model="title" required />
      <button type="submit">Create Task</button>
    </form>
    <TaskComp v-for="task in tasks" :key="task.id" :taskData="task" />
  </fieldset>
  </div>
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
      //this.$store.dispatch("getTasksByListId", this.listData);
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listData.id);
    }
  }
};
</script>

<style scoped>

.btn-delete-list
{
  background-color:darkred;
  color:silver;
  font-size:1rem;
}

.btn-delete-list:hover
{
  background-color:red;
}

.list-style
{
  background-color:seagreen;
}

.fieldset-list
{
  border:solid 2px black;
}
</style>