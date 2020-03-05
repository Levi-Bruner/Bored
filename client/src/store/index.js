import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    comments: {},
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.taskId, payload.comments)
    },
    deleteBoard(state, id) {
      state.boards = state.boards.filter(b => b.id != id)
    },
    deleteList(state, id) {
      state.lists = state.lists.filter(l => l.id != id)
    },
    //FIXME  
    deleteTask(state, id) {
      state.tasks = state.tasks.delete([id])
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    setActiveBoard({ commit, dispatch }, board) {
      commit("setActiveBoard", board)
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        let res = await api.delete("/boards/" + boardId);
        commit("deleteBoard", boardId)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("Boards/" + boardId + "/lists");
        commit("setLists", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getTasksByListId({ commit, dispatch }, listData) {
      try {
        let res = await api.get("boards/" + listData.boardId + "/lists/" + listData.id + "/tasks");
        commit("setTasks", { tasks: res.data, listId: listData.id })
      } catch (error) {
        console.error(error);
      }
    },
    async getCommentsByTaskId({ commit, dispatch }, taskData) {
      try {
        let res = await api.get("boards/" + taskData.boardId + "/lists/" + taskData.listId + "/tasks/" + taskData.id + "/comments")
        commit("setComments", { comments: res.data, taskId: taskData.id })
      } catch (error) {
        console.error(error)
      }
    },
    async addList({ commit, dispatch }, newList) {
      try {
        let res = await api.post('lists', newList)
        // commit("setLists", newList.title)
      } catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post('tasks', newTask)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, listId) {
      try {
        let res = await api.delete("lists/" + listId)
        commit("deleteList", listId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask({ commit, dispatch }, taskId) {
      try {
        let res = await api.delete("tasks/" + taskId)
        commit("deleteTask", taskId)
      } catch (error) {
        console.error(error)
      }
    }


    //#endregion
  }
})
