<template>
  <v-card
    class="flex-center"
    width="100%"
    max-width="1200"
    color="transparent"
    flat
  >
    <v-col class="ma-0 pa-0">
      <v-row class="mb-4">
        <v-col v-for="(region, index) in regions" :key="index" cols="12" md="4">
          <v-btn
            width="100%"
            :color="buttonColor(region.value)"
            :outlined="buttonOutlined(region.value)"
            @click="setRegion(region.value)"
          >
            {{ region.text }}
            <v-icon class="ml-3">
              {{ region.icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-carousel
        v-model="view"
        hide-delimiters
        :next-icon="false"
        :prev-icon="false"
        :cycle="false"
        height="100%"
      >
        <v-carousel-item value="vaults">
          <staking-pool-list :pools="vaultPools" />
        </v-carousel-item>
        <v-carousel-item value="pools">
          <staking-pool-list :pools="regularPools" />
        </v-carousel-item>
        <v-carousel-item value="super-pools">
          <staking-pool-list :pools="superPools" />
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-card>
</template>

<script>
import StakingPoolList from "~/components/staking/StakingPoolList";

import Pool from "~/database/models/Pool";

export default {
  name: "Staking",
  components: {
    StakingPoolList,
  },
  mounted() {
    const thisRef = this;
    window.setTimeout(function () {
      thisRef.$store.dispatch("updateData", 1);
    }, 2000);
  },
  data() {
    return {
      regions: [
        {
          text: "Vaults",
          icon: "mdi-lock",
          value: "vaults",
        },
        {
          text: "Pools",
          icon: "mdi-sail-boat",
          value: "pools",
        },
        {
          text: "Super Pools",
          icon: "mdi-ferry",
          value: "super-pools",
        },
      ],
    };
  },
  computed: {
    view() {
      return this.$nuxt.$route.query.view || "vaults";
    },

    buttonOutlined() {
      return (index) => {
        return this.view !== index;
      };
    },
    buttonColor() {
      return (index) => {
        return this.view === index ? "primary" : null;
      };
    },

    vaultPools() {
      return Pool.getters("getVaultPools");
    },
    regularPools() {
      return Pool.getters("getRegularPools");
    },
    superPools() {
      return Pool.getters("getSuperPools");
    },
  },
  methods: {
    setRegion(regionValue) {
      this.$nuxt.$router.push({ query: { view: regionValue } });
    },
  },
};
</script>
