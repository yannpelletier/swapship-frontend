import { ActionTree } from 'vuex'
import { WalletState } from '~/store/wallet/state'

const actions: ActionTree<WalletState, any> = {
    async refreshWallet({ commit }) {
        commit('SET_ADDRESS', await this.$web3ConnectorsManager.getAccount())
        commit('SET_CHAIN_ID', await this.$web3ConnectorsManager.getChainId())
    }
}

export default actions
