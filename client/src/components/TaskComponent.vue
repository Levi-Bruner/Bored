<template>
  <div>
    <h5>{{taskData.title}}</h5>
    <button @click="deleteTask">X</button>
  </div>
</template>

<script>
export default {
  name: "TaskComp",
  props: ["taskData"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData.id);
    }
  }
};
</script>

<style scoped>
</style>