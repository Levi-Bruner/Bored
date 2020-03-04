<template>
  <div class="col-4 list">
    <h3>{{listData.title}}</h3>
    <TaskComp />
  </div>
</template>

<script>
import TaskComp from "./TaskComponent";
export default {
  name: "ListComp",
  props: ["listData"],
  components: {
    TaskComp
  }
};
</script>

<style scoped>
</style>