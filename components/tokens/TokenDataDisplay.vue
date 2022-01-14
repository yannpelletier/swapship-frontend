<template>
  <v-card rounded outlined class="card">
    <v-card-title class="pa-10 vh-center">
      <v-img max-width="400" width="100%" :src="token.image" />
    </v-card-title>
    <v-card-title class="subhealine" style="background-color:#973836; border-radius: 5px 5px 0 0">
      <v-col class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          {{ token.name }}
        </v-row>
        <v-row class="ma-0 pa-0">
          ({{ token.ticker }})
        </v-row>
      </v-col>
    </v-card-title>
    <v-card-text class="title font-weight-light pt-3" style="background-color:#2a2b2c">
      <div>
        Price: {{ formatPrice }}
      </div>
      <div>
        Market Cap: {{ formatMarketCap }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import BigNumber from 'bignumber.js'

export default {
  name: 'TokenDataDisplay',
  props: {
    token: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatPrice () {
      return `$${new BigNumber(this.token.price).toFormat(2)}`
    },
    formatMarketCap () {
      return `$${new BigNumber(this.token.marketCap).toFormat(0)}`
    }
  }
}
</script>

<style scoped>
.card {
  background: rgb(31,30,54);
  background: linear-gradient(90deg, rgba(31,30,54,0.5) 0%, rgba(30,32,37,.75) 30%, rgba(30,32,37,1) 50%, rgba(30,32,37,0.75) 70%, rgba(31,30,54,0.5) 100%);
}
</style>
