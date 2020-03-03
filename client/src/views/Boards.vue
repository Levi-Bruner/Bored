<template>
  <div class="boards">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board.id">
      <router-link :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link>
    </div>
    <div class="container-fluid list-row">
      <div class="row">
        <BoardComp />
      </div>
    </div>
  </div>
</template>

<script>
import BoardComp from "@/components/BoardComponent";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  components: {
    BoardComp
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>