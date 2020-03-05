<template>
  <div>
    <router-link :to="{name: 'board', params: {boardId: this.boardData.id}}">
      <div @click="setActive" class="card m-auto" style="width: 18rem;">
        <div class="card-body text-center">
          <h3>{{boardData.title}}</h3>
          <h5>{{boardData.description}}</h5>
        </div>
      </div>
    </router-link>
    <button @click="deleteBoard">X</button>
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
</style>