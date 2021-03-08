<template>
  <div class="tile"
       :class="[tile.position, { 'active': tile.isActive, 'done': tile.isDone }]"
       ref="tile">
    <div class="tile__inner" ref="tileInner">
      <div class="tile__front">
        <div class="tile__logo"></div>
      </div>
      <div class="tile__back img-responsive tile__container">
        <img alt="" :src="tile.img">
        <div class="tile__text">
          <h2>{{ tile.name }}</h2>
          <p>{{ tile.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    tile: Object,
    tileIndex: Number
  },

  methods: {
    getImgPath (img) {
      if (img) {
        // return require('../assets/' + img)
        return require(img)
      }
      return ''
    }
  }
}
</script>
