<template>
  <v-dialog v-model="valueMid" transition="fade-transition" max-width="1000">
    <v-card>
      <v-card-title>
        Donate to the creators of the ecosystem
      </v-card-title>
      <v-card-subtitle class="mt-1">
        This ecosystem is being fueled exclusively through voluntary contributions. If you can afford it or if SwapShip or other RTC coins have made you a lot of money, please consider donating to one (or many) of these fine folks.
      </v-card-subtitle>
      <v-card-text class="vh-center">
        <v-row>
          <v-col v-for="(target, index) in donationTargets" :key="index" cols="12" sm="6" md="4">
            <v-card color="#111111">
              <v-card-subtitle>
                <v-row>
                  <v-col cols="auto">
                    <v-avatar>
                      <v-img :src="target.image" />
                    </v-avatar>
                  </v-col>
                  <v-col>
                    <v-row class="headline font-weight-bold" style="color:white;">
                      {{ target.name }}
                    </v-row>
                    <v-row class="subheadline">
                      {{ target.title }}
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-actions>
                <v-col>
                  Address
                  <copy-field :value="target.address" />
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CopyField from '@/components/inputs/CopyField'

export default {
  name: 'DonationDialog',
  components: {
    CopyField
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      donationTargets: [
        {
          name: 'Veronika Voss',
          title: 'Smart Contract Developper',
          address: '0x4E87A6A46523c28F6E470615f8263a9ee4385d87',
          image: require('~/static/avatars/verka.png')
        },
        {
          name: 'Boi',
          title: 'Website Developper',
          address: '0x5606d33E0e3257A14707aEFfdbDfAF4E4849eA10',
          image: require('~/static/avatars/boi.png')
        },
        {
          name: 'Chris Shiherlis',
          title: 'Visual Artist',
          address: '0xd42Ed88695be83469Dd306aD21586186F16e5531',
          image: require('~/static/avatars/chris.png')
        },
        {
          name: 'Slumpdeem',
          title: 'Medium Writer and Community Manager',
          address: '0x3D16451A4B73e778BFEC126025bA79716a17E32d',
          image: require('~/static/avatars/slumpdeem.png')
        },
        {
          name: 'Koshkoi',
          title: 'Social Media Manager (Discord, Twitter and Telegram)',
          address: '0x7fb30b64B13556fea1bfa5531f71911e7f635Aed',
          image: require('~/static/avatars/koshkoi.png')
        }
      ]
    }
  },
  computed: {
    valueMid: {
      set (input) {
        this.$emit('input', input)
      },
      get () {
        return this.value
      }
    }
  },
  methods: {
    donate () {
      this.$web3.eth.sendTransaction({ from: this.$web3.eth.defaultAccount, to: this.donationAddress, value: this.donationAmount })
    }
  }
}
</script>

<style scoped>

</style>
