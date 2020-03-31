<template>
  <div class="boardcomp-style col-12 col-md-3">
    <router-link :to="{name: 'board', params: {boardId: this.boardData.id}}">
      <div @click="setActive" class="card">
        <img class="card-img-top" src="https://picsum.photos/200" alt />
        <div class="card-body">
          <h4 class="card-title">{{boardData.title}}</h4>
          <p class="card-text">{{boardData.description}}</p>
        </div>
      </div>
    </router-link>
    <button class="btn-delete-board btn-danger" @click="deleteBoard">X</button>
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
.card-body {
  color: black;
}

.btn-delete-board {
  border-radius: 25%;
}
.btn-delete-board:hover {
  background-color: rgb(184, 39, 39);
}
</style>