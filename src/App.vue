<template>
  <div id="app">
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import Intro from '@/components/Intro.vue'
import Game from '@/components/Game.vue'
import LevelResult from '@/components/LevelResult.vue'
import LeaderBoard from '@/components/LeaderBoard.vue'

export default {
  name: 'App',
  components: {
    Intro, Game, LevelResult, LeaderBoard
  },
  computed: {
    currentComponent () {
      return this.$store.getters.getCurrentComponent
    }
  },
  // created () {
  //   // const id = this.getCookie('user_id')
  //   // const firstName = this.getCookie('first_name')
  //   // const lastName = this.getCookie('last_name')

  //   // if (id) {
  //   //   this.$store.commit('setUserData', { id, firstName, lastName })
  //   // } else {
  //   //   window.location.href = process.env.VUE_APP_GAMEHUB_URL
  //   // }
  // },
  methods: {
    getCookie (name) {
      const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
      ))
      return matches ? decodeURIComponent(matches[1]) : undefined
    }
  }
}
</script>

<style lang="scss">
@import 'styles/style';
</style>
