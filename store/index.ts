import database from '@/database'
import { Contract, ethers } from 'ethers'
import VuexORM from '@vuex-orm/core'
import Pool from '~/database/models/Pool'
import Token from '~/database/models/Token'
import RefreshType from '~/interfaces/enums/RefreshType'

export const plugins = [
  VuexORM.install(database)
]

export const strict = false

export const actions = {
  updateData(_: any, refreshType: RefreshType) {
    Pool.dispatch('loadOnChainData', refreshType)
    Token.dispatch('loadOnChainData', refreshType)
  },

  async connect({ dispatch }, connectorId?: string) {
    const provider = await this.$web3ConnectorsManager.connect(connectorId)
    await dispatch('setProvider', provider)
    await dispatch('wallet/refreshWallet')
  },

  async disconnect({ dispatch }) {
    if (this.$provider.removeAllListeners) {
      this.$provider.removeAllListeners('accountsChanged')
      this.$provider.removeAllListeners('chainChanged')
    }
    this.$web3ConnectorsManager.disconnect()
    this.$provider = undefined
    await dispatch('wallet/refreshWallet')
  },

  setProvider({ commit }, provider) {
    this.$provider = provider

    const web3Provider = new ethers.providers.Web3Provider(provider)
    const signer = web3Provider.getSigner()
    Object.keys(this.$contracts).forEach(contractId => {
      this.$contracts[contractId] = this.$contracts[contractId].connect(signer)
    })

    if (this.$provider.on) {
      this.$provider.on('accountsChanged', (accounts: string[]) => {
        commit('wallet/SET_ADDRESS', accounts[0])
      })
      this.$provider.on('chainChanged', (chainId: string) => {
        commit('wallet/SET_CHAIN_ID', chainId)
      })
    }
  },
}
