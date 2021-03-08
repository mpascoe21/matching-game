import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_GAME_API_BASEURL
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const axiosConfig = {
  auth: {
    username: 'matchinggame',
    password: 'gai1Noh6'
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      firstName: '',
      lastName: ''
    },
    userRank: 0,
    userTime: 0,
    currentLevel: 0,
    currentComponent: 'intro',
    currentLevelResult: null,
    levelsResult: [],
    leaderBoard: []
  },
  getters: {
    getCurrentLevel (state) {
      return state.currentLevel
    },
    getCurrentLevelResult (state) {
      return state.currentLevelResult
    },
    getCurrentComponent (state) {
      return state.currentComponent
    },
    getUserId (state) {
      return state.user.id
    },
    getUserName (state) {
      return state.user.firstName
    },
    getUserFullName (state) {
      return state.user.firstName + ' ' + state.user.lastName
    },
    getUserRank (state) {
      return state.userRank
    },
    getUserTime (state) {
      return state.userTime
    },
    getLevelsResult (state) {
      return state.levelsResult
    },
    getLevelsTotalResult (state) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      return state.levelsResult.reduce(reducer)
    },
    getLeaderBoard (state) {
      return state.leaderBoard
    }
  },
  mutations: {
    setCurrentLevel (state, payload) {
      state.currentLevel = payload
    },
    setCurrentLevelResult (state, payload) {
      state.currentLevelResult = payload
    },
    setCurrentComponent (state, payload) {
      state.currentComponent = payload
    },
    setLevelsResult (state, payload) {
      state.levelsResult[payload.level] = payload.time
    },
    resetLevelsResult (state) {
      state.levelsResult = []
    },
    setLeaderBoard (state, payload) {
      state.leaderBoard = payload
    },
    setUserData (state, payload) {
      state.user = payload
    },
    setUserRank (state, payload) {
      state.userRank = payload
    },
    setUserTime (state, payload) {
      state.userTime = payload
    }
  },
  actions: {
    saveResult ({ commit }, data) {
      return axios.post('/setGameLeaderboardScore', data, axiosConfig)
        .then(response => {
          console.log('setGameLeaderboardScore:')
          console.log(response)
          return response
        })
        .catch(error => {
          console.log('setGameLeaderboardScore error:')
          console.log(error)
          return error
        })
    },
    getLeaderBoard ({ state }) {
      return axios
        .get('/getGameLeaderboardScore?user_id=' + state.user.id, axiosConfig)
        .then(response => {
          // console.log('getGameLeaderboardScore response:')
          // console.log(response.data)
          return response
        })
        .catch(error => {
          console.log('getGameLeaderboardScore error:')
          console.log(error)
          return error
        })
    }
  }
})
