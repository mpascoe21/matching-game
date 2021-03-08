<template>
  <div class="leader-board">
    <div class="content">
      <h4>Well done <span>{{ userName }}</span>. Your fastest time to date is {{ userTime }}
        and you're currently in position {{ userRank }} on the leaderboard!</h4>
      <div>
        <div class="table main">
          <div class="table__row">
            <div class="table__cell"
                 v-for="(item, i) in tableHead"
                 :key="i">{{ item }}</div>
          </div>
          <div class="table__row"
               v-for="item in leaderBoard.slice(0, 10)"
               :key="item.rank"
               :class="{'current': item.user_id.toString() === userId.toString()}">
            <div class="table__cell">{{ item.rank }}</div>
            <div class="table__cell">{{ item.company_name || item.user_id }}</div>
            <div class="table__cell">{{ item.time }}</div>
          </div>
        </div>

        <div class="table out-top" v-if="leaderBoard.length > 10">
          <div class="table__row current">
            <div class="table__cell">{{ leaderBoard[10].rank }}</div>
            <div class="table__cell">{{ leaderBoard[10].name }}</div>
            <div class="table__cell">{{ leaderBoard[10].time }}</div>
          </div>
        </div>
      </div>

      <a href="#" class="button" @click.prevent="playAgain">
        <span>Play Again</span>
      </a>

      <div class="result-page__gamehub-cta">
        <a :href="gamehubUrl">Return to 360 Game Hub</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LeaderBoard',

  data () {
    return {
      tableHead: ['rank', 'company', 'time'],
      gamehubUrl: process.env.VUE_APP_GAMEHUB_URL
    }
  },

  computed: {
    ...mapGetters({
      leaderBoard: 'getLeaderBoard',
      userId: 'getUserId',
      userName: 'getUserName',
      userRank: 'getUserRank',
      userTime: 'getUserTime'
    })
  },

  methods: {
    playAgain () {
      this.$store.commit('setCurrentLevel', 1)
      this.$store.commit('setCurrentComponent', 'Game')
      this.$store.commit('setCurrentLevelResult', null)
      this.$store.commit('resetLevelsResult', [])
    }
  }
}
</script>
