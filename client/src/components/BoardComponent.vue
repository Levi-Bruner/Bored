<template>
  <div class = "boardcomp-style">
    <div class="row">
      <div class = "col-12 col-md-12">
    <fieldset class = "fieldset-board">
    <router-link :to="{name: 'board', params: {boardId: this.boardData.id}}">
      <div @click="setActive" class="card m-auto" style="width: 18rem;">
        <div class="card-body text-center">
          <h3>{{boardData.title}}</h3>
          <h5>{{boardData.description}}</h5>
        </div>
      </div>
    </router-link>
    <button class = "btn-delete-board" @click="deleteBoard">DELETE BOARD</button>
    </fieldset>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardComp",
  methods: {
    setActive() {
      this.$store.dispatch("setActiveBoard", this.boardData);
    },
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.boardData.id);
    }
  },
  props: ["boardData", "boardIndex"],
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  }
};
</script>

<style scoped>

.boardcomp-style
{
  background-color:gold;

}

.btn-delete-board
{
  background-color:darkred;
  color:silver;
}
.btn-delete-board:hover
{
  background-color:red;
}
.fieldset-board
{
  border:solid 2px black;
}
</style>