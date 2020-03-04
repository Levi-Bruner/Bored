<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import ListComp from "../components/ListComponent";
export default {
  name: "board",
  mounted() {
    return this.$store.dispatch(
      "getListsByBoardId",
      this.$route.params.boardId
    );
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
    }
  },
  props: ["boardId"]
};
</script>
