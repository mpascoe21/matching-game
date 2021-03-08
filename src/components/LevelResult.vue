<template>
  <div>
    <Header />
    <div class="result-page">
      <div class="image-wrapper"
          :class="backgroundSelector()"></div>

      <div class="content-wrapper">
        <div class="content">
          <template v-if="currentLevelResult">
            <img :src="successBg[currentLevel - 1]" alt="">
            <h1>You’re a real pro!</h1>
            <h4>You completed LEVEL {{ currentLevel }} <br> in {{ levelTime }}!</h4>
            <a href="#"
              v-if="currentLevel < 3"
              class="button"
              @click.prevent="goToNextLevel">
              <span>Next Level</span>
            </a>
          </template>

          <template v-else>
            <h1>Level failed!</h1>
            <h4>Better luck next time.</h4>
            <a href="#" class="button" @click.prevent="tryAgain">
              <span>Try Again</span>
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapGetters } from 'vuex'
import Header from './Header'

export default {
  name: 'LevelResult',

  components: { Header },

  data () {
    return {
      successTitles: ['Great job!', 'Awesome!', 'You’re a real pro!'],
      successBg: ['../assets/level1.jpg', '../assets/level2.jpg', '../assets/level3.jpg'],
      gamehubUrl: process.env.VUE_APP_GAMEHUB_URL
    }
  },

  computed: {
    ...mapGetters({
      currentLevel: 'getCurrentLevel',
      currentLevelResult: 'getCurrentLevelResult',
      levelsResult: 'getLevelsResult',
      userId: 'getUserId'
    }),
    levelTime () {
      const time = this.levelsResult[this.currentLevel]
      const seconds = time % 60 === 0 ? '' : time % 60
      const secondsText = seconds && ' ' + seconds + ' second' + (seconds > 1 ? 's' : '')
      const minutes = time < 60 ? '' : ((time - seconds) / 60) % 60
      const minutesText = minutes && minutes + ' minute' + (minutes > 1 ? 's' : '')
      return minutesText + secondsText || 'no time'
    }
  },

  async created () {
    if (this.currentLevel === 3 && this.currentLevelResult) {
      const id = this.$store.getters.getUserId + ''

      const seconds = this.$store.getters.getLevelsTotalResult
      const formatSeconds = this.formatSeconds(seconds)

      const currentTime = this.getCurrentTime()

      const response = await this.$store.dispatch('saveResult', {
        user_id: id,
        time_elapsed: formatSeconds,
        created_at: currentTime
      })

      if (response.status === 201) {
        const leaderBoard = await this.$store.dispatch('getLeaderBoard')

        if (leaderBoard.status === 200) {
          this.$store.commit('setLeaderBoard', leaderBoard.data)

          const currentUser = leaderBoard.data.find(item => {
            const a = item.user_id + ''
            const b = this.userId + ''
            return a === b
          })

          this.$store.commit('setUserRank', currentUser.rank)
          this.$store.commit('setUserTime', currentUser.time)
        }
      } else {
        console.log('something went wrong')
        console.log(response)
      }
    }
  },

  mounted () {
    const tl = gsap.timeline()
    tl
      .add(gsap.from('.image-wrapper', { duration: 0.3, scale: 0.2 }))
      .add(gsap.to('.image-wrapper', { duration: 0.3, scale: 1.3 }))
      .add(gsap.to('.image-wrapper', { duration: 0.3, scale: 1 }))
    gsap.from('.content', { duration: 0.5, y: '300px' })
  },

  methods: {
    goToNextLevel () {
      this.$store.commit('setCurrentLevel', this.currentLevel + 1)
      this.$store.commit('setCurrentComponent', 'Game')
    },
    goToLeaderboard () {
      this.$store.commit('setCurrentComponent', 'LeaderBoard')
    },
    tryAgain () {
      this.$store.commit('setCurrentComponent', 'Game')
    },
    getCurrentTime () {
      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const date = today.getFullYear() + '-' + this.formatValue(month) + '-' + this.formatValue(day)

      const hours = today.getHours()
      const minutes = today.getMinutes()
      const seconds = today.getSeconds()
      const time = this.formatValue(hours) + ':' + this.formatValue(minutes) + ':' + this.formatValue(seconds)
      return date + ' ' + time
    },
    formatSeconds (seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8)
    },
    formatValue (value) {
      return value < 10 ? '0' + value : value
    },
    backgroundSelector () {
      if (!this.currentLevelResult) {
        return 'fail'
      }
      if (this.currentLevel === 1) {
        return 'completed1'
      } else if (this.currentLevel === 2) {
        return 'completed2'
      } else {
        return 'completed3'
      }
    }
  }
}
</script>
