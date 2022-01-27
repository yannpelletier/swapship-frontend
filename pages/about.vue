<template>
  <v-card class="pa-5" width="100%" max-width="1200">
    <h1 class="mt-5">What is the Read This Contract ecosystem?</h1>
    <span>
      It is an ecosystem of coins that are designed to be on-chain experiments
      that that are as decentralized as possible and have uses in each other's
      sub-ecosystem.
    </span>
    <v-row>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            <v-img :src="require('~/static/tokens/rtc.png')" />
          </v-card-title>
          <v-card-title>
            <v-btn
              width="100%"
              color="primary"
              class="mb-2"
              @click="buyTickerOnUniswap(Ticker.RTC)"
            >
              Buy on Uniswap
            </v-btn>
            <v-btn width="100%" @click="viewContract(Ticker.RTC)">
              Read contract
            </v-btn>
          </v-card-title>
          <v-card-title
            style="background-color: #973836; border-radius: 5px 5px 0 0"
          >
            <v-col class="ma-0 pa-0">
              <v-row class="ma-0 pa-0"> Read This Contract </v-row>
              <v-row class="ma-0 pa-0"> (RTC) </v-row>
            </v-col>
          </v-card-title>
          <v-card-text class="pt-3 card-text">
            The genesis of the ecosystem. Serves no purpose alone but has
            advantages when coupled with other coins of the ecosystem.
            <br /><br />
            For every new RTC Token release, 10% of the initial supply is
            airdropped relative to your proportion of the holding of the pool of
            RTC.
            <br /><br />
            The name originated from the fact that the only marketing done for
            the coin was linking the Etherscan to the contract for people to
            read what it was about.
            <br /><br />
            This is also true for other coins of the ecosystem.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            <v-img :src="require('~/static/tokens/liqlo.png')" />
          </v-card-title>
          <v-card-title>
            <v-btn
              width="100%"
              color="primary"
              class="mb-2"
              @click="buyTickerOnUniswap(Ticker.LIQLO)"
            >
              Buy on Uniswap
            </v-btn>
            <v-btn width="100%" @click="viewContract(Ticker.LIQLO)">
              Read contract
            </v-btn>
          </v-card-title>
          <v-card-title
            style="background-color: #973836; border-radius: 5px 5px 0 0"
          >
            <v-col class="ma-0 pa-0">
              <v-row class="ma-0 pa-0"> Liquid Lottery </v-row>
              <v-row class="ma-0 pa-0"> (LIQLO) </v-row>
            </v-col>
          </v-card-title>
          <v-card-text class="pt-3 card-text">
            A lottery system based on the Uniswap pool. You add liquidity to the
            RTC-ETH pool on Uniswap with every ETH worth of RTC-ETH counting as
            1 "ticket.
            <br /><br />
            Once per day when RTC-ETH pool liquidity is above 32 ETH, a random
            "ticket" receives 1 ETH, 1 RTC and 1 LIQLO.
            <br /><br />
            Once per day when RTC-ETH pool liquidity is above 32 ETH, the top
            liquidity provider receives: 1 ETH + 2 RTC + 3 LIQLO.
            <br /><br />
            The daily prize of 2 ETH comes from selling RTC reserve back to the
            pool, meaning once per day there is a small chance to enter RTC at a
            discount.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            <v-img :src="require('~/static/tokens/swsh.png')" />
          </v-card-title>
          <v-card-title>
            <v-btn
              width="100%"
              color="primary"
              class="mb-2"
              @click="buyTickerOnUniswap(Ticker.SWSH)"
            >
              Buy on Uniswap
            </v-btn>
            <v-btn width="100%" @click="viewContract(Ticker.SWSH)">
              Read contract
            </v-btn>
          </v-card-title>
          <v-card-title
            style="background-color: #973836; border-radius: 5px 5px 0 0"
          >
            <v-col class="ma-0 pa-0">
              <v-row class="ma-0 pa-0"> SwapShip </v-row>
              <v-row class="ma-0 pa-0"> (SWSH) </v-row>
            </v-col>
          </v-card-title>
          <v-card-text class="pt-3 card-text">
            <span>
              SwapShip is a fork of Sushi that is also notably better on several
              aspects:
            </span>
            <ul>
              <li>No 10% dev fee, so no magic dev tokens to dump,</li>
              <li>
                CaptainCook contract is the owner of the SWSH token contract,
              </li>
              <li>
                Only the CaptainCook contract can mint SWSH, the contract owner
                can't,
              </li>
              <li>SWSH-ETH Uniswap pool liquidity locked at Unicrypt,</li>
              <li>
                Initial supply is 22,000 SWSH, 19,970 pooled on Uniswap, 2,020
                airdropped to RTC holders,
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            <v-img :src="require('~/static/tokens/spectre.png')" />
          </v-card-title>
          <v-card-title>
            <v-btn
              width="100%"
              color="primary"
              class="mb-2"
              @click="buyTickerOnUniswap(Ticker.SPECTRE)"
            >
              Buy on Uniswap
            </v-btn>
            <v-btn width="100%" @click="viewContract(Ticker.SPECTRE)">
              Read contract
            </v-btn>
          </v-card-title>
          <v-card-title
            style="background-color: #973836; border-radius: 5px 5px 0 0"
          >
            <v-col class="ma-0 pa-0">
              <v-row class="ma-0 pa-0"> Speculative Resistance </v-row>
              <v-row class="ma-0 pa-0"> (SPECTRE) </v-row>
            </v-col>
          </v-card-title>
          <v-card-text class="pt-3 card-text">
            SPECTRE is intended to act as a deflationary token with a gradual
            reduction in supply and appreciating value, along with yet another
            fair launch.
            <br /><br />
            Total supply is 56,000 SPECTRE. 5,000 is airdropped to RTC holders
            and Uniswap LP holders of RTC pairs (-SWSH, -LIQLO, -ETH). 1,000 is
            kept in reserve to create future pools paired with SPECTRE. Minting
            is locked, and the supply is final.
            <br /><br />
            Whenever SPECTRE-ETH Uniswap pool Ethereum liquidity is above 12
            ETH, the following process can occur:
            <ul>
              <li>
                10% of "V Liquidity" is removed from the pool through Uniswap,
              </li>
              <li>
                all un-pooled ETH is used to regularly buy SPECTRE back from the
                pool in chunks of 1 ETH,
              </li>
              <li>
                all un-pooled & bought-back SPECTRE, minus a miniscule 1% dev
                fee, is sent to Burn Address.
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-card-title>
            <v-img :src="require('~/static/tokens/pshp.png')" />
          </v-card-title>
          <v-card-title>
            <v-btn
              width="100%"
              color="primary"
              class="mb-2"
              @click="buyTickerOnUniswap(Ticker.PSHP)"
            >
              Buy on Uniswap
            </v-btn>
            <v-btn width="100%" @click="viewContract(Ticker.PSHP)">
              Read contract
            </v-btn>
          </v-card-title>
          <v-card-title
            style="background-color: #973836; border-radius: 5px 5px 0 0"
          >
            <v-col class="ma-0 pa-0">
              <v-row class="ma-0 pa-0"> Payship </v-row>
              <v-row class="ma-0 pa-0"> (PSHP) </v-row>
            </v-col>
          </v-card-title>
          <v-card-text class="pt-3 card-text">
            Payship is a major step forward in crypto lending. Deposit any ERC20
            token. Use any ERC20 token as collateral. Earn interest on any
            deposit. Borrow any ERC20 token. Earn PSHP on deposits and borrows.
            Stake PSHP to earn portion of Payship income. Vote with PSHP on the
            future of Payship.
            <br /><br />
            Payship is also a major step forward in borrower and lender
            protection, and lending economics in general. Collateral factors and
            interest rates of deposits and borrows are re-calculated once a day
            based on the performance of the entire ERC20 token ecosystem. Every
            rate has a 24 hour guarantee through the daily re-calculation. Upon
            every deposit, the lender instantly receives back to the wallet the
            equivalent value in Payship platform ERC20 stablecoin, PSD (Payship
            Dollar).
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Ticker from "~/interfaces/enums/Ticker";

export default {
  name: "About",
  computed: {
    Ticker() {
      return Ticker;
    },
  },
  methods: {
    buyTickerOnUniswap(ticker) {
      window.open(
        `https://app.uniswap.org/#/swap?inputCurrency=${this.$contracts[ticker].address}`
      );
    },
    viewContract(ticker) {
      window.open(
        `https://etherscan.io/address/${this.$contracts[ticker].address}#code`
      );
    },
  },
};
</script>

<style scoped>
.card-text {
  background-color: #2a2b2c;
}
</style>
