<template>
  <div class="game-page">
    <div class="tiles-head">
      <img src="../assets/rhino-logo.png" alt="">
      <div class="title">Level {{ currentLevel }}</div>
      <Counter :time="levelTime" />
    </div>

    <div class="tile-list" :class="`level-${currentLevel}`">
      <Tile v-for="(tile, index) in tilesArray"
            :key="index"
            :tile="tile"
            :ref="`tile${index}`"
            @click.native="handleTileClick(index)" />
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter'
import Tile from '@/components/Tile.vue'
import { gsap } from 'gsap'
import axios from 'axios'

export default {
  name: 'Game',

  components: {
    Counter, Tile
  },

  computed: {
    currentLevel () {
      return this.$store.getters.getCurrentLevel
    },
    tilesArray () {
      return this['level' + this.currentLevel]
    }
  },

  async created () {
    const level = 'level' + this.currentLevel

    let employees = []
    await axios.get('http://twom061-003.s3.amazonaws.com/s2d-prod/api/team.json')
      .then(response => {
        const fullTemp = response.data
        const tempEmployees = []
        fullTemp.forEach(element => {
          if (element.department.find(el => el === 'partnermarketing-com')) {
            tempEmployees.push({ name: element.title.replace('&#8217;', ' '), role: element.position, img: element.image.desktop })
          }
        })
        if (this.currentLevel === 1) {
          employees = tempEmployees.sort(() => 0.5 - Math.random()).slice(0, 3)
        } else if (this.currentLevel === 2) {
          employees = tempEmployees.sort(() => 0.5 - Math.random()).slice(0, 6)
        } else if (this.currentLevel === 3) {
          employees = tempEmployees.sort(() => 0.5 - Math.random()).slice(0, 12)
        }
      })

    const newArr = this[level].map((item, index) => ({
      ...item, img: employees[index].img, name: employees[index].name, role: employees[index].role
    }))

    console.log(newArr)
    this[level] = newArr

    const arrCopy = this[level].map(item => ({ ...item }))
    this[level].push(...arrCopy)

    this[level].sort(() => Math.random() - 0.5)
    this.levelTime = this.time[this.currentLevel]
  },

  mounted () {
    this.$store.commit('setCurrentLevelResult', false)
    this.timerId = setInterval(() => {
      this.levelTime--
      if (this.levelTime === 0) {
        clearInterval(this.timerId)
        this.$store.commit('setCurrentComponent', 'LevelResult')
      }
    }, 1000)
  },

  beforeDestroy () {
    if (this.timerId) clearInterval(this.timerId)
  },

  data () {
    return {
      isAnimation: false,
      activeTileIndex: null,
      completedPairCount: 0,

      timerId: null,
      levelTime: null,
      time: {
        1: 15,
        2: 30,
        3: 90
      },
      pairs: {
        1: 3,
        2: 6,
        3: 12
      },
      level1: [
        {
          id: 0,
          position: 'right-top',
          isActive: false,
          isDone: false
        },
        {
          id: 1,
          position: 'center-bottom',
          isActive: false,
          isDone: false
        },
        {
          id: 2,
          position: 'center',
          isActive: false,
          isDone: false
        }
      ],
      level2: [
        {
          id: 0,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 1,
          position: 'center-bottom',
          isActive: false,
          isDone: false
        },
        {
          id: 2,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 3,
          position: 'right-top',
          isActive: false,
          isDone: false
        },
        {
          id: 4,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 5,
          position: 'center',
          isActive: false,
          isDone: false
        }
      ],
      level3: [
        {
          id: 0,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 1,
          position: 'right-top',
          isActive: false,
          isDone: false
        },
        {
          id: 2,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 3,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 4,
          position: 'right-bottom',
          isActive: false,
          isDone: false
        },
        {
          id: 5,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 6,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 7,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 8,
          position: 'center',
          isActive: false,
          isDone: false
        },
        {
          id: 9,
          position: 'center-bottom',
          isActive: false,
          isDone: false
        },
        {
          id: 10,
          position: 'center-bottom',
          isActive: false,
          isDone: false
        },
        {
          id: 11,
          position: 'center',
          isActive: false,
          isDone: false
        }
      ]
    }
  },

  methods: {
    handleTileClick (currentIndex) {
      const level = 'level' + this.currentLevel
      const currentTile = this[level][currentIndex]

      if (this.isAnimation || currentTile.isActive || currentTile.isDone) return

      const currentTileInner = this.$refs['tile' + currentIndex][0].$refs.tileInner

      currentTile.isActive = true
      const firstAnimation = gsap.to(currentTileInner, { duration: 0.6, rotationY: 180 })

      if (this.activeTileIndex !== null) {
        const activeTile = this[level][this.activeTileIndex]

        if (activeTile.id === currentTile.id) {
          // - guessed
          this.completedPairCount++
          if (this.completedPairCount === this.pairs[this.currentLevel]) {
            clearInterval(this.timerId)
          }

          firstAnimation.eventCallback('onComplete', () => {
            activeTile.isDone = true
            currentTile.isDone = true

            if (this.completedPairCount === this.pairs[this.currentLevel]) {
              // clearInterval(this.timerId)
              const tl = gsap.timeline({ onComplete: this.goToLevelResult })
              tl
                .add(gsap.to('.tile__inner', { duration: 200000.6, rotationY: 0, delay: 0.6 }))
                .add(gsap.to('.tile', { duration: 0.4, y: '-30px' }))
                .add(gsap.to('.tile', { duration: 0.6, y: '100vh' }))
                .add(gsap.to('.tiles-head', { duration: 0.6, y: '-300px' }))
            }
          })
        } else {
          // - did not guess
          const activeTileInner = this.$refs['tile' + this.activeTileIndex][0].$refs.tileInner
          const tl = gsap.timeline({
            onComplete: () => {
              this.isAnimation = false
              activeTile.isActive = false
              currentTile.isActive = false
            }
          })

          tl
            .add(gsap.to(currentTileInner, { duration: 0.6, rotationY: 180 }))
            .add(gsap.to(activeTileInner, { duration: 0.6, rotationY: 0 }))
            .add(gsap.to(currentTileInner, { duration: 0.6, rotationY: 0 }), '-=0.6')
        }
        this.activeTileIndex = null
      } else {
        this.activeTileIndex = currentIndex
      }
    },
    goToLevelResult () {
      this.$store.commit(
        'setLevelsResult',
        {
          level: this.currentLevel,
          time: this.time[this.currentLevel] - this.levelTime
        })
      this.$store.commit('setCurrentLevelResult', true)
      this.$store.commit('setCurrentComponent', 'LevelResult')
    }
  }
}
</script>
