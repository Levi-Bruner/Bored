<template>
  <div class="board board-style">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <div>
    <div class="row p-2"></div>
      <form @submit.prevent="addList">
        <input type="text" placeholder="title" v-model="newList.title" required />
        <button type="submit">Create List</button>
      </form>
    <div class="row p-2"></div>
    <hr>
    </div>
    <div class="container-fluid">
      <div class="row list-row">
        <div class="col-12 col-md-12">
          <ListComp v-for="(list) in lists" :key="list.id" :listData="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListComp from "../components/ListComponent";
export default {
  name: "board",
  data() {
    return {
      newList: {}
    };
  },
  mounted() {
    return this.$store.dispatch(
      "getListsByBoardId",
      this.$route.params.boardId
    );
  },
  methods: {
    addList() {
      this.newList = {
        boardId: this.$route.params.boardId,
        creatorEmail: this.user.email,
        title: this.newList.title
      };
      this.$store.dispatch("addList", this.newList);
      return this.$store.dispatch(
        "getListsByBoardId",
        this.$route.params.boardId
      );
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    ListComp
  }
};
</script>

<style scoped>

.board-style
{
  background-color:gold;
}

.fieldset-list-board
{
  border:solid 2px black;
}

hr
{
  border:solid 2px black
}
</style>
