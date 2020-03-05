<template>
  <div class="col-4 list">
    <h3>{{listData.title}}</h3>
    <TaskComp v-for="(task) in tasks" :key="task.id" :taskData="task" />
  </div>
</template>

<script>
import TaskComp from "./TaskComponent";
export default {
  name: "ListComp",
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
    }
  }
};
</script>

<style scoped>
</style>