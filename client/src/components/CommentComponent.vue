<template>
  <div>
    <div class="rows">
      <div class="col-12 col-md-12">
        {{commentData.content}}
        <button class="btn-delete-comment" @click="deleteComment">X</button>
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
      this.$store.dispatch("deleteComment", this.commentData);
    }
  }
};
</script>

<style scoped>
.btn-delete-comment {
  background-color: darkred;
  color: silver;
  font-size: 0.5rem;
}

.btn-delete-comment:hover {
  color: red;
}
</style>