<template>
  <v-card
    v-if="!isError"
    class="flex-center"
    width="100%"
    max-width="1200"
    color="transparent"
    flat
  >
    <v-col>
      <v-row>
        <!-- STAKED VALUE -->
        <v-col cols="12" md="9">
          <span class="headline"> Staked Value </span>
          <v-skeleton-loader type="card" :loading="isLoading">
            <v-card outlined class="pa-5 card">
              <v-row v-if="$vuetify.breakpoint.smAndDown" class="vh-center">
                <div class="display-1 font-weight-light">
                  ${{ stakedValue }}
                </div>
              </v-row>
              <v-row v-if="$vuetify.breakpoint.smAndDown" class="mt-3 mb-6">
                <v-divider />
              </v-row>
              <v-row>
                <v-col
                  v-if="$vuetify.breakpoint.mdAndUp"
                  cols="3"
                  class="vh-center"
                >
                  <div class="display-1 font-weight-light">
                    ${{ stakedValue }}
                  </div>
                </v-col>
                <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1">
                  <v-divider vertical />
                </v-col>
                <v-col cols="12" md="7">
                  <v-row>
                    <v-col
                      v-for="(token, index) in pooledTokens"
                      :key="index"
                      cols="12"
                      lg="6"
                      class="pa-0 ma-0"
                    >
                      <v-card outlined class="ma-1">
                        <v-row class="pa-2">
                          <v-col cols="7" class="vh-center pa-0 ma-0">
                            <v-avatar :size="22" class="mr-1 my-1">
                              <v-img :src="token.image" />
                            </v-avatar>
                            {{ formatValue(token.pooled, token.decimals, 4) }}
                            {{ token.ticker }}
                          </v-col>
                          <v-col cols="1" class="vh-center pa-0 ma-0">
                            <v-divider vertical />
                          </v-col>
                          <v-col cols="4" class="vh-center pa-0 ma-0">
                            {{ formatPrice(token.pooledValue, 1) }}
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-skeleton-loader>
        </v-col>

        <!-- CLAIMABLE VALUE -->
        <v-col cols="12" md="3">
          <span class="headline"> Claimable Value </span>
          <v-skeleton-loader type="card" height="100%" :loading="isLoading">
            <v-card outlined class="pa-5 card vh-center" height="100%">
              <div class="display-1 font-weight-light">
                ${{ claimableValue }}
              </div>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-3 mb-2">
        <v-divider />
      </v-row>
      <v-row>
        <!-- TOTAL STAKED VALUE -->
        <v-col cols="12">
          <span class="headline"> Total Staked Value </span>
          <v-skeleton-loader type="card" :loading="isLoading">
            <v-card outlined class="pa-5 card">
              <v-row class="vh-center">
                <div class="display-1 py-5 font-weight-light">
                  ${{ totalStakedValue }}
                </div>
              </v-row>
              <v-row class="mt-3 mb-6">
                <v-divider />
              </v-row>
              <v-row>
                <v-col
                  v-for="(token, index) in regularTokens"
                  :key="index"
                  cols="12"
                  md="4"
                  class="pa-0 ma-0"
                >
                  <v-card outlined class="ma-1 py-3">
                    <v-row class="pa-2">
                      <v-col cols="7" class="vh-center pa-0 ma-0">
                        <v-avatar :size="22" class="mr-1 my-1">
                          <v-img :src="token.image" />
                        </v-avatar>
                        {{ formatValue(token.totalPooled, token.decimals, 5) }}
                        {{ token.ticker }}
                      </v-col>
                      <v-col cols="1" class="vh-center pa-0 ma-0">
                        <v-divider vertical />
                      </v-col>
                      <v-col cols="4" class="vh-center pa-0 ma-0">
                        {{ formatPrice(token.totalPooledValue, 1) }}
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mt-3 mb-2">
        <v-divider />
      </v-row>
      <v-row class="vh-center font-weight-medium display-2 mt-4">
        RTC Ecosystem
      </v-row>
      <v-row>
        <v-col cols="12">
          <span class="headline"> Total Ecosystem Market Cap </span>
          <v-skeleton-loader
            type="card"
            :loading="isLoading"
            class="card-shining-legendary"
          >
            <v-card
              width="100%"
              height="200"
              class="vh-center card-legendary"
              :class="{
                'display-3': $vuetify.breakpoint.smAndUp,
                'display-2': $vuetify.breakpoint.xsOnly,
              }"
            >
              ${{ totalRTCMarketCap }}
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(token, index) in RTCTokens"
          :key="index"
          cols="12"
          md="6"
          lg="4"
        >
          <v-skeleton-loader type="card" :loading="isLoading">
            <token-data-display :token="token" />
          </v-skeleton-loader>
        </v-col>
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
        <v-row> Failed to load some data necessary for the dashboard </v-row>
        <v-row class="mt-3 vh-center">
          <v-btn @click="reloadFailedData"> Attempt refresh </v-btn>
        </v-row>
      </v-col>
    </div>
  </v-card>
</template>

<script lang="ts">
import Pool from "@/database/models/Pool";
import Token from "@/database/models/Token";
import BigNumber from "bignumber.js";

import TokenDataDisplay from "~/components/tokens/TokenDataDisplay.vue";

import LoadingStatus from "~/interfaces/enums/LoadingStatus";
import RefreshType from "~/interfaces/enums/RefreshType";
import RegularToken from "~/database/models/RegularToken";

export default {
  name: "Dashboard",
  components: {
    TokenDataDisplay,
  },
  mounted() {
    const thisRef = this;
    window.setTimeout(function () {
      thisRef.$store.dispatch("updateData", 1);
    }, 2000);
  },
  computed: {
    loadingStatus() {
      let poolStatus: LoadingStatus = LoadingStatus.Loaded;
      this.pools.some((pool: Pool) => {
        if (pool.isError) {
          poolStatus = LoadingStatus.Error;
          return true;
        } else if (pool.isLoading) {
          poolStatus = LoadingStatus.Loading;
          return true;
        }
      });
      return poolStatus;
    },
    isLoading() {
      return this.loadingStatus === LoadingStatus.Loading;
    },
    isError() {
      return this.loadingStatus === LoadingStatus.Error;
    },

    formatValue() {
      return (value, decimals, precision = 4) => {
        return new BigNumber(value).shiftedBy(-decimals).toPrecision(precision);
      };
    },
    formatPrice() {
      return (price, decimals) => {
        return `$${new BigNumber(price).toFormat(decimals)}`;
      };
    },

    pools() {
      return Pool.getters("getPools");
    },
    regularTokens() {
      return Token.getters("getRegularTokens");
    },
    pooledTokens() {
      return Token.getters("getPooledTokens");
    },
    claimableTokens() {
      return [];
    },

    RTCTokens() {
      return Token.getters("getRTCTokens");
    },
    totalRTCMarketCap() {
      const value = this.RTCTokens.reduce(
        (accumulator: BigNumber, token: RegularToken) => {
          return accumulator.plus(token.marketCap);
        },
        new BigNumber("0")
      );
      return value.toFormat(0);
    },

    stakedValue() {
      const value = this.pools.reduce((accumulator: BigNumber, pool: Pool) => {
        return accumulator.plus(pool.stakedValue);
      }, new BigNumber("0"));
      return value.toFormat(1);
    },

    claimableValue() {
      const value = this.pools.reduce((accumulator: BigNumber, pool: Pool) => {
        return accumulator.plus(pool.claimableValue);
      }, new BigNumber("0"));
      return value.toFormat(2);
    },

    totalStakedValue() {
      const value = this.pools.reduce((accumulator: BigNumber, pool: Pool) => {
        return accumulator.plus(pool.totalStakedValue);
      }, new BigNumber("0"));
      return value.toFormat(0);
    },
  },
  methods: {
    reloadFailedData() {
      this.$store.dispatch("updateData", RefreshType.Failed);
    },
  },
};
</script>

<style scoped>
.card {
  background: rgb(31, 30, 54);
  background: linear-gradient(
    90deg,
    rgba(30, 32, 37, 1) 0%,
    rgba(31, 30, 54, 0.7) 50%,
    rgba(30, 32, 37, 1) 100%
  );
}

.card-legendary {
  background: rgb(99, 95, 68);
  background: linear-gradient(
    90deg,
    rgba(30, 32, 37, 1) 0%,
    rgba(99, 95, 68, 0.5) 50%,
    rgba(30, 32, 37, 1) 100%
  );
}
</style>
