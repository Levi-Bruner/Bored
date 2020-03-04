<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <div>
      <form @submit.prevent="addList">
        <input type="text" placeholder="title" v-model="newList.title" required />
        <button type="submit">Create List</button>
      </form>
    </div>
    <ListComp v-for="(list) in lists" :key="list.id" :listData="list" />
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
      debugger;
      this.newList = {
        boardId: this.$route.params.boardId,
        creatorEmail: this.user.email,
        title: this.newList
      };
      this.$store.dispatch("addList", this.newList);
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
