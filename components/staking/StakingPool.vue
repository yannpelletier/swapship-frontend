<template>
  <v-expansion-panel class="pool-header" :style="headerStyle">
    <v-skeleton-loader
      ref="loader"
      :style="loaderStyle"
      :loading="pool.isLoading"
      type="card"
      height="120"
      transition="fade-transition"
    >
      <v-expansion-panel-header
        v-if="!pool.isError"
        class="pt-8 pb-5"
        :class="{ 'pool-irrelevant': !hasClaimable }"
      >
        <v-row>
          <v-col cols="12" md="3" order="1" order-md="2" class="text-center">
            <v-row class="font-weight-medium title">
              {{ pool.name }}
              <v-card
                v-if="pool.multiplier > 0"
                class="mx-2 title"
                :color="multiplerColor"
                width="45"
                height="30"
              >
                x{{ pool.multiplier }}
              </v-card>
            </v-row>
            <v-row
              v-if="pool.type === PoolType.LIQUIDITY"
              class="subheading font-weight-light"
            >
              {{ pool.token.exchange.name }} Liquidity
            </v-row>
          </v-col>
          <v-col cols="12" md="3" order="2" order-md="1">
            <staking-pool-tokens-visual
              :token="pool.token"
              :rewards="pool.rewards"
            />
          </v-col>

          <v-col cols="12" sm="3" md="2" order="3" class="text-center">
            <v-row class="font-weight-light pool-header-title">
              Staked Value
            </v-row>
            <v-row class="font-weight-medium title">
              {{ formatPrice(pool.stakedValue, 1) }}
            </v-row>
            <v-row class="font-weight-light">
              of {{ formatPrice(pool.totalStakedValue, 1) }}
            </v-row>
          </v-col>

          <v-col cols="12" sm="3" md="2" order="4" class="text-center">
            <v-row class="font-weight-light pool-header-title">
              Claimable Value
              <v-tooltip top color="accent" max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    icon
                    height="15"
                    width="15"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="grey lighten-1" size="15">
                      mdi-information
                    </v-icon>
                  </v-btn>
                </template>
                <v-col>
                  <v-row v-for="(reward, index) in pool.rewards" :key="index">
                    <v-avatar :size="20" class="mx-1">
                      <v-img :src="reward.token.image" eager />
                    </v-avatar>
                    {{ reward.tokenTicker }}
                    :
                    {{ formatPrice(reward.claimableValue, 4) }}
                  </v-row>
                </v-col>
              </v-tooltip>
            </v-row>
            <v-row class="font-weight-medium title">
              {{ formatPrice(pool.claimableValue, 2) }}
            </v-row>
          </v-col>

          <v-col
            v-if="pool.isActive"
            cols="12"
            sm="3"
            md="2"
            order="5"
            class="text-center"
          >
            <v-row class="font-weight-light pool-header-title">
              APY (unstable)
            </v-row>
            <v-row class="font-weight-medium title"> {{ pool.apy }}% </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-header v-else>
        <v-spacer />
        <v-col cols="auto">
          <v-row class="mb-2"> Failed to load some pool data </v-row>
          <v-row>
            <v-btn @click="reloadFailedData"> Attempt to reload </v-btn>
          </v-row>
        </v-col>
        <v-spacer />
      </v-expansion-panel-header>
    </v-skeleton-loader>

    <v-expansion-panel-content v-if="!pool.isError" color="#2a3141">
      <v-row>
        <!-- POOL IS ACTIVE -->
        <template v-if="pool.isActive">
          <!-- AVAILABLE LP -->
          <v-col cols="12" md="6" class="py-6">
            <template v-if="hasBalance">
              <number-proportion-field
                v-model="stake"
                :max="pool.tokenBalance"
                :decimals="pool.token.decimals"
                label="Stakeable"
                :unit="formattedTicker"
                class="px-10"
              />
              <v-row class="vh-center">
                <v-btn
                  v-if="pool.type === PoolType.LIQUIDITY"
                  color="primary"
                  class="mx-2"
                  @click="openGetLink"
                >
                  Get LP Tokens
                  <v-avatar class="ml-2" size="20">
                    <v-img :src="pool.token.exchange.image" eager />
                  </v-avatar>
                </v-btn>
                <v-btn
                  v-if="pool.type === PoolType.VAULT"
                  color="primary"
                  class="mx-2"
                  @click="openGetLink"
                >
                  Buy on Uniswap
                  <v-avatar class="ml-2" size="20">
                    <v-img :src="pool.token.image" eager />
                  </v-avatar>
                </v-btn>
                <v-btn
                  v-if="stakeInputUnderApprovedAmount"
                  :disabled="stakeInputZero"
                  color="primary"
                  class="mx-2"
                  @click="stakeInPool"
                >
                  Stake
                </v-btn>
                <v-btn v-else color="primary" class="mx-2" @click="approvePool">
                  Approve
                </v-btn>
              </v-row>
            </template>
            <template v-else>
              <v-card
                rounded
                height="100%"
                min-height="150"
                class="vh-center font-weight-light"
                color="#00000066"
              >
                <v-col cols="10">
                  <v-row class="vh-center"> No tokens to stake </v-row>
                  <v-row class="vh-center">
                    <v-col
                      v-if="pool.type === PoolType.LIQUIDITY"
                      cols="auto"
                      class="vh-center"
                    >
                      <v-btn color="primary" @click="openGetLink">
                        Get LP Tokens
                        <v-avatar class="ml-2" size="20">
                          <v-img :src="pool.token.exchange.image" eager />
                        </v-avatar>
                      </v-btn>
                    </v-col>
                    <v-col
                      v-if="pool.type === PoolType.VAULT"
                      cols="auto"
                      class="vh-center"
                    >
                      <v-btn color="primary" @click="openGetLink">
                        Buy on UniSwap
                        <v-avatar class="ml-2" size="20">
                          <v-img :src="pool.token.image" eager />
                        </v-avatar>
                      </v-btn>
                    </v-col>
                    <v-col
                      v-if="!stakeInputUnderApprovedAmount"
                      cols="auto"
                      class="vh-center"
                    >
                      <v-btn color="primary" @click="approvePool">
                        Approve
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-card>
            </template>
          </v-col>

          <!-- STAKED LP -->
          <v-col cols="12" md="3" class="py-6">
            <template v-if="hasStaked">
              <number-proportion-field
                v-model="unstake"
                :max="pool.tokenStaked"
                :decimals="pool.token.decimals"
                label="Staked"
                :unit="formattedTicker"
                class="px-6"
              />
              <v-row>
                <v-spacer />
                <v-btn
                  color="primary"
                  :disabled="unstakeInputZero"
                  @click="withdrawAndClaimRewards"
                >
                  Unstake and claim
                </v-btn>
                <v-spacer />
              </v-row>
            </template>
            <template v-else>
              <v-card
                rounded
                height="100%"
                min-height="150"
                class="pa-2 font-weight-light vh-center"
                color="#00000066"
              >
                No tokens to unstake
              </v-card>
            </template>
          </v-col>

          <!-- CLAIMABLE REWARDS -->
          <v-col cols="12" md="3" class="py-6">
            <v-card
              rounded
              height="100%"
              min-height="150"
              class="pa-2 vh-center"
              color="#00000066"
            >
              <div v-if="hasClaimable">
                <div class="font-weight-bold">Rewards</div>
                <div
                  v-for="(reward, index) in pool.rewards"
                  :key="index"
                  class="font-weight-light"
                >
                  <v-avatar :size="25" class="mx-1">
                    <v-img :src="reward.token.image" eager />
                  </v-avatar>
                  <span class="font-weight-bold">
                    {{ formatValue(reward.claimable, reward.token.decimals) }}
                  </span>
                  {{ reward.tokenTicker }}
                  <v-tooltip
                    v-if="reward.note"
                    top
                    color="accent"
                    max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        icon
                        height="15"
                        width="15"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="grey lighten-1" size="15">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-col>
                      {{ reward.note }}
                    </v-col>
                  </v-tooltip>
                </div>
                <div class="vh-center mt-4">
                  <v-btn color="primary" @click="claimRewards"> Claim </v-btn>
                </div>
              </div>
              <div v-else>No rewards to claim</div>
            </v-card>
          </v-col>
        </template>
        <!-- POOL IS EXPIRED -->
        <template v-else>
          <v-col cols="12" md="8" class="py-6 vh-center">
            <v-card
              rounded
              width="100%"
              height="100%"
              min-height="150"
              class="pa-2 font-weight-light vh-center"
              color="#00000066"
            >
              <v-col>
                <v-row class="vh-center mb-3 font-weight-bold">
                  Staked: {{ stakedValueStr }}
                </v-row>
                <v-row class="vh-center mb-2">
                  <v-btn color="primary" @click="withdrawAndClaimAll">
                    Withdraw everything
                  </v-btn>
                </v-row>
                <v-row class="vh-center">
                  This will also claim your rewards
                </v-row>
              </v-col>
            </v-card>
          </v-col>

          <!-- CLAIMABLE REWARDS -->
          <v-col cols="12" md="4" class="py-6">
            <v-card
              rounded
              height="100%"
              min-height="150"
              class="pa-2 vh-center"
              color="#00000066"
            >
              <div v-if="hasClaimable">
                <div class="font-weight-bold">Rewards</div>
                <div
                  v-for="(reward, index) in pool.rewards"
                  :key="index"
                  class="font-weight-light"
                >
                  <v-avatar :size="25" class="mx-1">
                    <v-img :src="reward.token.image" eager />
                  </v-avatar>
                  <span class="font-weight-bold">
                    {{ formatValue(reward.claimable, reward.token.decimals) }}
                  </span>
                  {{ reward.tokenTicker }}
                  <v-tooltip
                    v-if="reward.note"
                    top
                    color="accent"
                    max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        icon
                        height="15"
                        width="15"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="grey lighten-1" size="15">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-col>
                      {{ reward.note }}
                    </v-col>
                  </v-tooltip>
                </div>
              </div>
              <div v-else>No rewards to claim</div>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import NumberProportionField from "~/components/inputs/NumberProportionField";
import StakingPoolTokensVisual from "~/components/staking/StakingPoolTokensVisual";

import Pool from "~/database/models/Pool";
import RefreshType from "~/interfaces/enums/RefreshType";
import PoolType from "~/interfaces/enums/PoolType";
const BigNumber = require("bignumber.js");

const SHINE_MIN_INTERVAL = 5500;
const SHINE_MAX_INTERVAL = 14000;

export default {
  name: "StakingPool",
  components: {
    NumberProportionField,
    StakingPoolTokensVisual,
  },
  props: {
    pool: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      stake: new BigNumber("0").shiftedBy(this.pool.token.decimals).toString(),
      unstake: new BigNumber("0")
        .shiftedBy(this.pool.token.decimals)
        .toString(),
      multiplierRarityMap: {
        1: {
          multiplierColor: "rgb(0,1,29)",
        },
        2: {
          headerColor: "#004564",
          multiplierColor: "#004e7c",
        },
        5: {
          headerColor: "#350000",
          multiplierColor: "#600000",
        },
        10: {
          headerColor: "#635F44",
          multiplierColor: "rgba(99,95,68,1)",
        },
      },
    };
  },
  computed: {
    PoolType() {
      return PoolType;
    },

    headerStyle() {
      const rarityMap = this.multiplierRarityMap[this.pool.multiplier];
      if (rarityMap && rarityMap.headerColor) {
        return {
          background: `linear-gradient(90deg, ${rarityMap.headerColor} 0%, rgba(30,32,37,1) 40%)`,
        };
      } else {
        return {};
      }
    },
    loaderStyle() {
      const rarityMap = this.multiplierRarityMap[this.pool.multiplier];
      if (rarityMap && rarityMap.headerColor) {
        return {
          "background-image": `-webkit-linear-gradient(
            top left,
            ${rarityMap.headerColor}00 0%,
            ${rarityMap.headerColor}00 45%,
            ${rarityMap.headerColor}24 48%,
            ${rarityMap.headerColor}44 50%,
            ${rarityMap.headerColor}24 52%,
            ${rarityMap.headerColor}00 57%,
            ${rarityMap.headerColor}00 100%
          )`,
          "background-size": "1000px 1000px",
        };
      } else {
        return {};
      }
    },

    hasBalance() {
      return new BigNumber(this.pool.tokenBalance).isGreaterThan(0);
    },
    hasStaked() {
      return new BigNumber(this.pool.tokenStaked).isGreaterThan(0);
    },
    hasClaimable() {
      return new BigNumber(this.pool.claimableValue).isGreaterThan(0);
    },

    formattedTicker() {
      if (this.pool.type === PoolType.LIQUIDITY) {
        return "LP";
      } else {
        return this.pool.tokenTicker;
      }
    },

    formatValue() {
      return (value, decimals) => {
        return new BigNumber(value)
          .shiftedBy(-decimals)
          .toPrecision(3)
          .toString();
      };
    },
    formatPrice() {
      return (price, decimals) => {
        return `$${new BigNumber(price).toFormat(decimals)}`;
      };
    },

    stakeInputUnderApprovedAmount() {
      const approvedAmountBig = new BigNumber(this.pool.tokenApproved);
      return new BigNumber(this.stake).isLessThan(approvedAmountBig);
    },
    stakeInputZero() {
      return new BigNumber(this.stake).isEqualTo(0);
    },
    unstakeInputZero() {
      return new BigNumber(this.unstake).isEqualTo(0);
    },

    stakedValueStr() {
      if (this.hasStaked) {
        const decimal = new BigNumber(this.pool.tokenStaked)
          .shiftedBy(-this.pool.token.decimals)
          .toFormat(6)
          .toString();
        return `${decimal} ${this.formattedTicker}`;
      } else {
        return "N/A";
      }
    },

    multiplerColor() {
      const rarityMap = this.multiplierRarityMap[this.pool.multiplier];
      return rarityMap ? rarityMap.multiplierColor : null;
    },
  },
  mounted() {
    this.injectShineAnimation();
  },
  methods: {
    injectShineAnimation() {
      const interval =
        Math.random() * (SHINE_MAX_INTERVAL - SHINE_MIN_INTERVAL) +
        SHINE_MIN_INTERVAL;
      if (this.$refs.loader) {
        this.$refs.loader.$el.animate(
          [
            // keyframes
            {
              backgroundRepeat: "no-repeat",
              backgroundPosition: "-2000px -2000px",
            },
            {
              backgroundRepeat: "no-repeat",
              backgroundPosition: "3000px 2000px",
            },
          ],
          {
            // timing options
            duration: interval,
            iterations: Infinity,
          }
        );
      }
    },

    approvePool() {
      Pool.dispatch("approvePool", this.pool);
    },

    stakeInPool() {
      Pool.dispatch("stakeInPool", { pool: this.pool, amount: this.stake });
    },
    withdrawAndClaimAll() {
      Pool.dispatch("withdrawAndClaimRewards", {
        pool: this.pool,
        amount: this.pool.tokenStaked,
      });
    },
    withdrawAndClaimRewards() {
      Pool.dispatch("withdrawAndClaimRewards", {
        pool: this.pool,
        amount: this.unstake,
      });
    },
    claimRewards() {
      Pool.dispatch("withdrawAndClaimRewards", { pool: this.pool, amount: 0 });
    },

    reloadFailedData() {
      this.$store.dispatch("updateData", RefreshType.Failed);
    },

    openGetLink() {
      Pool.dispatch("openGetLink", this.pool);
    },
  },
};
</script>

<style scoped>
.pool-header-title {
  color: #c4c4c4;
}

.pool-header {
  background: rgb(31, 30, 54);
  background: linear-gradient(
    90deg,
    rgba(31, 30, 54, 1) 0%,
    rgba(30, 32, 37, 1) 30%,
    rgba(30, 32, 37, 1) 50%,
    rgba(30, 32, 37, 1) 70%,
    rgba(31, 31, 40, 1) 100%
  );
}
</style>
