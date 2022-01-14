<template>
  <v-card
    v-if="expiredStakedPools.length > 0"
    class="flex-center"
    width="100%"
    max-width="1200"
    color="transparent"
    flat
  >
    <v-col class="ma-0 pa-0">
      <v-row class="vh-center display-1">
        Expired Pools
      </v-row>
      <v-row class="vh-center subheader mb-4">
        These pools that you still have value staked into no longer yield rewards, unstake now to recover your liquidity tokens
      </v-row>
      <v-row>
        <staking-pool-list :pools="expiredStakedPools" />
      </v-row>
    </v-col>
  </v-card>
  <v-card
    v-else
    color="transparent"
    width="100%"
    max-width="1200"
    min-height="80vh"
    class="vh-center"
  >
    <div>
      <v-col cols="auto">
        <v-row class="display-2 text-center">
          No pools to recover from, move along
        </v-row>
      </v-col>
    </div>
  </v-card>
</template>

<script>
import StakingPoolList from '~/components/staking/StakingPoolList'

import Pool from '~/database/models/Pool'

export default {
  name: 'RecoverVue',
  components: {
    StakingPoolList
  },
  computed: {
    expiredStakedPools () {
      return Pool.getters('getExpiredStakedPools')
    }
  }
}
</script>

<style scoped>

</style>
