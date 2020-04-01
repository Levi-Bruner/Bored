<template>
  <div class="boards board-style">
    <p class="board-title">Select Your Project</p>
    <div class="container-fluid">
      <!-- Button trigger modal -->
      <button
        title="Add a new board"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#modelId"
      >+</button>
      <div class="row list-row">
        <BoardComp
          v-for="(boardObj, index) in boards"
          :key="boardObj.id"
          :boardData="boardObj"
          :boardIndex="index"
        />

        <!-- Modal -->
        <div
          class="modal fade"
          id="modelId"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Board</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addBoard">
                  <input type="text" placeholder="title" v-model="newBoard.title" required />
                  <input type="text" placeholder="description" v-model="newBoard.description" />
                  <button class="btn btn-secondary" type="submit">Create Board</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save</button>
              </div>
            </div>
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
.board-style {
  background-color: darkslategray;
  height: 100vh;
}

.board-title {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.list-row {
  padding-top: 5px;
  justify-content: space-evenly;
}
</style>
