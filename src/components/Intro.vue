<template>
  <div>
    <Header />
    <div class="intro-page">
      <div class="intro-page__container">
        <div class="content">
          <h1>Speed Match</h1>
          <p>Can you match all the Channel Solution team pairs before the time runs out?</p>
          <p>Simply click two identical cards in succession to create a match. The fastest player to complete all three levels wins a spin.</p>
          <h4>Welcome <span>{{ userName }}</span></h4>
          <a href="#" class="play-button" @click.prevent="startFirstLevel"><span>let's play</span></a>
        </div>
        <div class="content-imgs">
          <div v-for="employee in employees" :key="employee.name" class="content-imgs__tile">
            <img :src="employee.image" alt="">
            <div class="content-imgs__text">
              <h2>{{ employee.name }}</h2>
              <p>{{ employee.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header'

export default {
  name: 'Intro',

  components: { Header },

  data () {
    return {
      tempEmployees: [],
      employees: []
    }
  },

  mounted () {
    axios.get('http://twom061-003.s3.amazonaws.com/s2d-prod/api/team.json')
      .then(response => {
        const fullTemp = response.data
        fullTemp.forEach(element => {
          if (element.department.find(el => el === 'partnermarketing-com')) {
            this.tempEmployees.push({ name: element.title.replace('&#8217;', ' '), role: element.position, image: element.image.desktop })
          }
        })
        this.employees = this.tempEmployees.sort(() => 0.5 - Math.random()).slice(0, 6)
        console.log(this.employees)
      })
  },

  computed: {
    userName () {
      return this.$store.getters.getUserFullName
    }
  },

  methods: {
    startFirstLevel () {
      this.$store.commit('setCurrentLevel', 1)
      this.$store.commit('setCurrentComponent', 'Game')
    }
  }
}
</script>
