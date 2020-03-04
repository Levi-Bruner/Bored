<template>
  <div class="boards">
    WELCOME TO THE BOARDS!!!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div class="container-fluid list-row">
      <div class="row">
        <BoardComp
          v-for="(boardObj, index) in boards"
          :key="boardObj.id"
          :boardData="boardObj"
          :boardIndex="index"
        />
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