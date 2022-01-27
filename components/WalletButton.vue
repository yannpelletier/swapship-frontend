<template>
  <v-btn v-if="!isConnected" outlined @click="connectWallet">
    Connect Wallet
  </v-btn>
  <div v-else>
    <v-dialog v-model="walletDialog" max-width="500" height="80%">
      <v-card class="pa-2">
        <v-card-title> My Account </v-card-title>
        <v-card-text />
        <v-card-actions>
          <v-btn color="primary"> View on Etherscan </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card outlined ripple class="pa-3 rounded" @click="openWalletDialog">
      <v-icon color="success" class="mx-1"> mdi-circle-medium </v-icon>
      {{ abbreviatedAddress }}
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RefreshType from "~/interfaces/enums/RefreshType";

export default {
  name: "WalletButton",
  data() {
    return {
      walletDialog: false,
    };
  },
  computed: {
    ...mapGetters("wallet", {
      address: "getAddress",
      abbreviatedAddress: "getAbbreviatedAddress",
      isConnected: "isConnected",
    }),
  },
  methods: {
    ...mapActions(["connect", "disconnect"]),

    connectWallet() {
      try {
        this.connect("injected");
      } catch (e) {}
    },
    disconnectWallet() {
      try {
        this.disconnect();
      } catch (e) {}
    },
    openWalletDialog() {
      this.walletDialog = true;
    },
  },
};
</script>
