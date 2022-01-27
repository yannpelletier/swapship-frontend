<template>
  <div>
    <v-dialog
      v-model="tradingDialog"
      max-width="800"
      transition="fade-transition"
    >
      <v-row>
        <v-col cols="12" md="6" class="headline font-weight-bold text-center">
          <v-card
            class="pa-4 exchange-card"
            color="accent"
            @click="openSushiswap"
          >
            Sushiswap
            <v-img
              width="600"
              height="350"
              :src="require('~/static/sushiswap-large.png')"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="headline font-weight-bold text-center">
          <v-card
            class="pa-4 exchange-card"
            color="accent"
            @click="openUniswap"
          >
            Uniswap
            <v-img
              width="500"
              height="350"
              :src="require('~/static/uniswap-large.jpg')"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>

    <donation-dialog v-model="donationDialog" />

    <v-row style="min-height: 90vh" align="center" justify="center">
      <v-col class="pa-2">
        <v-row>
          <v-spacer />
          <v-img
            :src="require('~/static/logos/symbol-text.png')"
            :lazy-src="require('~/static/logos/symbol-text-low-res.png')"
            width="75vw"
            max-width="800"
            min-width="250"
            height="150"
            contain
          />
          <v-spacer />
        </v-row>
        <v-row class="container">
          <v-col cols="12" sm="6" lg="3">
            <nuxt-link to="/dashboard">
              <parallax-card
                :src="require('~/static/card-images/dashboard.jpg')"
              >
                <h1 slot="header">Trusty Helm</h1>
                <p slot="content">
                  Get a dashboard view of your staked value, rewards, total
                  staked value and data on the RTC ecosystem
                </p>
              </parallax-card>
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <nuxt-link to="/staking">
              <parallax-card :src="require('~/static/card-images/staking.jpg')">
                <h1 slot="header">Hoarding Cabin</h1>
                <p slot="content">
                  Add liquidity to well known DeFi tokens and tokens from the
                  Read The Contract ecosystem through UniSwap and SushiSwap to
                  farm SWSH and RTC
                </p>
              </parallax-card>
            </nuxt-link>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <div @click="openExchangeDialog">
              <parallax-card
                :src="require('~/static/card-images/exchange.jpg')"
                @click="openExchangeDialog"
              >
                <h1 slot="header">Trading Docks</h1>
                <p slot="content">
                  Swap tokens or add liquidity through our 2 supported DEXes
                </p>
              </parallax-card>
            </div>
          </v-col>
          <v-col cols="12" sm="6" lg="3">
            <nuxt-link to="/about">
              <parallax-card
                :src="require('~/static/card-images/about.jpg')"
                captain
              >
                <h1 slot="header">Captain's Log</h1>
                <p slot="content">
                  Learn everything there is to know about SwapShip and the Read
                  The Contract ecosystem
                </p>
              </parallax-card>
            </nuxt-link>
          </v-col>
        </v-row>
        <v-row class="mt-10 vh-center">
          <v-spacer />
          <v-btn
            v-for="(social, index) in socials"
            :key="index"
            class="mx-1 social-button"
            :href="social.href"
            width="65"
            height="65"
            fab
            color="accent"
          >
            <v-icon class="social-icon" size="30">
              {{ social.icon }}
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-1 social-button"
            href="https://medium.com/swapship-finance"
            width="65"
            height="65"
            fab
            color="accent"
          >
            <medium-icon />
          </v-btn>
          <v-btn class="mx-5" @click="openDonationDialog"> Donate </v-btn>
          <v-spacer />
        </v-row>
        <v-row />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DonationDialog from "~/components/DonationDialog";
import ParallaxCard from "~/components/ParallaxCard";
import MediumIcon from "~/components/icons/MediumIcon";

export default {
  components: {
    MediumIcon,
    DonationDialog,
    ParallaxCard,
  },
  data() {
    return {
      tradingDialog: false,
      donationDialog: false,
      ethBalance: "0",
      socials: [
        {
          icon: "mdi-twitter",
          href: "https://twitter.com/SwapShip",
        },
        {
          icon: "mdi-discord",
          href: "https://discord.gg/c36UHrb",
        },
        {
          icon: "mdi-file-document-edit-outline",
          href: "https://etherscan.io/address/0x3ac2AB91dDF57e2385089202Ca221C360CED0062#code",
        },
      ],
    };
  },
  methods: {
    openExchangeDialog() {
      this.tradingDialog = true;
    },
    openDonationDialog() {
      this.donationDialog = true;
    },

    openUniswap() {
      window.open(
        "https://app.uniswap.org/#/swaps?inputCurrency=0x3ac2AB91dDF57e2385089202Ca221C360CED0062"
      );
    },
    openSushiswap() {
      window.open(
        "https://exchange.sushiswapclassic.org/#/swap?inputCurrency=0x3ac2AB91dDF57e2385089202Ca221C360CED0062"
      );
    },
  },
  layout: "navless",
};
</script>

<style lang="scss" scoped>
.logo {
  filter: drop-shadow(0px 0px 15px black);
}

.social-button {
  transition: filter 0.32s;
}

.social-button {
  &:hover {
    filter: drop-shadow(1px 1px 5px #2c799c);

    .social-icon {
      color: #2c799c;
    }
  }
}

.exchange-card {
  filter: drop-shadow(1px 1px 15px black);
}

.exchange-card:hover {
  filter: drop-shadow(1px 1px 15px #2c799c);
}
</style>
