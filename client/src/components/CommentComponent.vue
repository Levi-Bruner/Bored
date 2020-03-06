<template>
  <div>
    <div class = "rows">
      <div class = "col-12 col-md-12">
      <fieldset class = "fieldset-comment comment-style">
    {{commentData.content}}
    <button class = "btn-delete-comment" @click="deleteComment">DELETE COMMENT</button>
    </fieldset >
    </div>
    </div>
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

.btn-delete-comment
{
  background-color:darkred;
  color:silver;
  font-size:.5rem;
}

.btn-delete-comment:hover
{
  color:red;
}

.commment-style
{
  
}

.fieldset-comment
{
  border:solid 2px black;
  background-color:gray;
}
</style>