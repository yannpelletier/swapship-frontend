<template>
  <v-card color="transparent" flat class="vh-center" :height="avatarSize">
    <v-row>
      <v-col cols="5">
        <v-card color="transparent" flat width="100%" height="100%">
          <v-avatar v-for="(token, index) in pooledTokens" :key="index" :size="avatarSize" class="token" :style="tokenStyle(index, pooledTokens.length)">
            <v-img :src="token.image" />
          </v-avatar>
        </v-card>
      </v-col>
      <v-col cols="1">
        <v-card color="transparent" flat width="100%" height="100%">
          <v-icon class="arrow" :size="arrowSize">
            mdi-arrow-right
          </v-icon>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card color="transparent" flat width="100%" height="100%">
          <v-avatar v-for="(reward, index) in rewards" :key="index" :size="avatarSize" class="token" :style="tokenStyle(index, rewards.length)">
            <v-img :src="reward.token.image" />
          </v-avatar>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TokenType from '~/interfaces/enums/TokenType'

const MIN_TOKEN_WIDTH_OFFSET = 20
const MAX_TOKEN_WIDTH_OFFSET = 80

export default {
  name: 'StakingPoolTokensVisual',
  props: {
    token: {
      type: Object,
      required: true
    },
    rewards: {
      type: Array,
      required: true
    }
  },
  computed: {
    pooledTokens () {
      if (this.token.type === TokenType.LIQUIDITY) {
        return [
          this.token.firstToken,
          this.token.secondToken
        ]
      } else {
        return [
          this.token
        ]
      }
    },

    avatarSize () {
      return this.$vuetify.breakpoint.mdAndUp ? '45' : '45'
    },
    arrowSize () {
      return this.$vuetify.breakpoint.mdAndUp ? '35' : '18'
    },

    tokenStyle () {
      return (index, count) => {
        const ratio = index / (count - 1)
        const translateValue = ratio * (MAX_TOKEN_WIDTH_OFFSET - MIN_TOKEN_WIDTH_OFFSET) + MIN_TOKEN_WIDTH_OFFSET
        return {
          transform: `translateX(-${translateValue}%) translateY(50%)`
        }
      }
    }
  }
}
</script>

<style scoped>
.token {
  position:absolute;
  left: 50%;
  bottom: 50%;
  transform: translateX(-80%) translateY(50%);
}

.arrow {
  position:absolute;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%) translateY(50%);
}
</style>
