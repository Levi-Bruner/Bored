<template>
  <div>
    {{commentData.content}}
    <button @click="deleteComment">x</button>
  </div>
</template>

<script>
export default {
  name: "CommentComp",
  props: ["commentData"],
  methods: {

     deleteComment() {

      //this.$store.dispatch("deleteTask", this.taskData.id);
      //debugger;
      this.$store.dispatch("deleteComment", this.commentData);
    }
    
  }
};
</script>

<style scoped>
</style>