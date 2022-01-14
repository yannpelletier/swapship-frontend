<template>
  <div
    ref="card"
    class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="card"
      :style="cardStyle"
    >
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]" />
      <div v-if="disabled" class="display-2 font-weight-bold disabled-overlay">
        <v-card width="100%" class="vw-center text-center pa-5" style="filter: drop-shadow(1px 1px 5px #2c799c);" color="#2a2b2cCC">
          <span style="filter: drop-shadow(1px 1px 5px #2c799c);">
            {{ disabledLabel }}
          </span>
        </v-card>
      </div>
      <div class="card-info">
        <div class="card-header">
          <slot name="header" />
        </div>
        <div class="card-content">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParallaxCard',
  props: {
    src: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledLabel: {
      type: String,
      default: null
    }
  },
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX () {
      return this.mouseX / this.width
    },
    mousePY () {
      return this.mouseY / this.height
    },
    cardStyle () {
      const rX = this.mousePX * 30
      const rY = this.mousePY * -30
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      }
    },
    cardBgTransform () {
      const tX = this.mousePX * -15
      const tY = this.mousePY * -15
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage () {
      return {
        backgroundImage: `url(${this.src})`
      }
    }
  },
  mounted () {
    if (this.$refs.card) {
      this.width = this.$refs.card.offsetWidth
      this.height = this.$refs.card.offsetHeight
    }
  },
  methods: {
    handleMouseMove (e) {
      if (this.$refs.card) {
        this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2
        this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2
      }
    },
    handleMouseEnter () {
      clearTimeout(this.mouseLeaveDelay)
    },
    handleMouseLeave () {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0
        this.mouseY = 0
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

body {
  margin: 40px 0;
  font-family: "Raleway";
  font-size: 14px;
  font-weight: 500;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
}

.title {
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1+p, p+p {
  margin-top: 10px;
}

.card-header {
  border-radius: 5px 5px 0 0;
  padding: 5px;
  font-weight: bold;
  transition: all .25s;
}

.card-content {
  border-radius: 0 0 5px 5px;
  padding: 5px;
  transition: all .25s;
}

.disabled-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    .card-info {
      transform: translateY(0);
    }
    .card-info p {
      opacity: 1;
    }
    .card-info, .card-info p {
      transition: 0.6s $hoverEasing;
    }
    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transition:
        0.6s $hoverEasing,
        opacity 1s;
      opacity: 1;
    }
    .card {
      filter: drop-shadow(1px 1px 5px #2c799c);
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(#2c799c, 0.2) 0 0 40px 5px,
        rgba(#2c799c, 1) 0 0 0 1px,
        rgba(white, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset #2c799c 0 0 0 6px;
    }

    .card-header {
      font-weight: bold;
      background-color: #973836;
      transition: background-color .25s;
    }

    .card-content {
      background-color: #2a2b2c;
      transition: background-color .25s;
    }
  }
}

.card {
  position: relative;
  flex: 0 0 240px;
  width: 100%;
  min-width:275px;
  height: 500px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.45) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s;

  .card-bg {
    opacity: 0.55;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-repeat: repeat;
    background-position: center;
    background-size: cover;
    transition:
      1s $returnEasing,
      opacity .5s;
    pointer-events: none;
  }
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: .5s;

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: .5s;
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: .5s;
  }
}

.card-info h1 {
  font-family: Roboto;
  font-size: 30px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}
</style>
