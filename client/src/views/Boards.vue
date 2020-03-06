<template>
  <div class="boards board-style">
    <p class = "board-title">
      WELCOME TO THE BOARDS!!!
    </p>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div class = "row p-2">
    <div class="container-fluid list-row">
      <div class="row">
        <div class = "col-12 col-md-12">
        <BoardComp
          v-for="(boardObj, index) in boards"
          :key="boardObj.id"
          :boardData="boardObj"
          :boardIndex="index"
        />
      </div>
      </div>
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
    },
    setActiveBoard() {
      this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    }
  }
};
</script>

<style scoped>

.board-style
{
  background-color:slateblue;
  height:100vh;
}

.board-title
{
  display:flex;
  justify-content:center;
  font-size:2rem;
  font-weight:bold;
}
</style>
