const abbreviateAddress: Function = (address: string) => {
  const begin = address.slice(0, 6)
  const end = address.slice(38)
  return `${begin}...${end}`
}

export const state = {
  connectedAccount: null
}

export const mutations = {
  setConnectedAccount (state: any, account: string) {
    state.connectedAccount = account
  },
}

export const actions = {
  async refreshAccount ({ commit }: any, callback: Function) {
    if (this.$web3 && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      const account = accounts ? accounts[0] : null
      commit('setConnectedAccount', account)
      this.$web3.eth.defaultAccount = account

      await callback()
    }
  },

  viewOnEtherscan ({ state }: any) {
    window.open(`https://etherscan.io/address/${state.connectedAccount}`, '_blank')
  }
}

export const getters = {
  accountIsConnected (state: any) {
    return state.connectedAccount != null
  },

  connectedAccount (state: any) {
    return state.connectedAccount
  },

  connectedAccountAbbreviated (_: any, getters: any) {
    return getters.connectedAccount ? abbreviateAddress(getters.connectedAccount) : ''
  }
}
