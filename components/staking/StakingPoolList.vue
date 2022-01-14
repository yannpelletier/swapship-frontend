<template>
  <v-expansion-panels style="transition: all .25s">
    <template v-for="(pool, index) in pools">
      <staking-pool :key="index" :pool="pool" />
    </template>
  </v-expansion-panels>
</template>

<script>
import StakingPool from '~/components/staking/StakingPool'

export default {
  name: 'StakingPoolList',
  components: {
    StakingPool
  },
  props: {
    pools: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
