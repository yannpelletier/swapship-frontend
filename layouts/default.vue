<template>
  <v-app dark class="app">
    <v-app-bar app class="vh-center">
      <v-toolbar width="1250" max-width="100vw" flat>
        <nuxt-link to="/">
          <v-img
            :src="require('~/static/logos/symbol-text.png')"
            :max-width="$vuetify.breakpoint.smAndUp ? '175' : '100'"
            contain
          />
        </nuxt-link>

        <v-spacer />

        <wallet-button />
      </v-toolbar>
    </v-app-bar>
    <v-main>
      <v-card v-if="expiredStakedPools.length > 0 && !onRecoverPage" class="vh-center">
        <div>
          <v-col class="my-3">
            <v-row class="mb-2">
              You have tokens staked into expired pools
            </v-row>
            <v-row class="vh-center">
              <v-btn to="/recover" color="secondary" class="higher-yield-button">
                Recover tokens
              </v-btn>
            </v-row>
          </v-col>
        </div>
      </v-card>
      <v-container>
        <div class="container">
          <nuxt />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import Pool from '~/database/models/Pool'
import WalletButton from '~/components/WalletButton.vue'

export default {
  name: 'Default',
  components: {
    WalletButton
  },
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapGetters('drizzle', ['isDrizzleInitialized']),

    onRecoverPage () {
      return this.$nuxt.$route.path === '/recover'
    },
    expiredStakedPools () {
      return Pool.getters('getExpiredStakedPools')
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .app {
    font-family: Roboto;
  }

   .higher-yield-button {
     animation: seesawShadow 2.5s ease-in-out infinite;
   }

  @keyframes seesawShadow {
    0% {
      filter: drop-shadow(0px 0px 5px #790404);
    }
    50% {
      filter: drop-shadow(0px 0px 20px #790404);
    }
    100% {
      filter: drop-shadow(0px 0px 5px #790404);
    }
  }
</style>
