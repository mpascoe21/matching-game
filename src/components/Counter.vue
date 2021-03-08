<template>
  <div class="counter">
    <span class="counter__label">time</span>
    <span class="counter__value">{{ currentTime }}</span>
  </div>
</template>

<script>
export default {
  name: 'Counter',

  props: {
    time: Number
  },

  computed: {
    currentTime () {
      const seconds = this.time % 60
      const minutes = ((this.time - seconds) / 60) % 60
      const hours = this.time < 3600 ? '' : (this.time - minutes * 60 - seconds) / 3600 + ':'
      return hours + `0${minutes}`.substr(-2) + ':' + `0${seconds}`.substr(-2)
    }
  }
}
</script>
