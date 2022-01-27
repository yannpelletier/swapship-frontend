import { BigNumber } from 'ethers'
import { MutationTree } from 'vuex'
import { WalletState } from '~/store/wallet/state'

const mutations: MutationTree<WalletState> = {
    SET_ADDRESS(state, address?: string) {
        if (address) {
            state.address = address
        } else {
            state.address = undefined
        }
    },
    SET_CHAIN_ID(state, chainId?: number | string) {
        if (chainId) {
            if (typeof chainId == 'string') {
                const chainIdNumber = BigNumber.from(chainId).toNumber()
                state.chainId = chainIdNumber
            } else {
                state.chainId = chainId
            }
        } else {
            state.chainId = undefined
        }
    },
}

export default mutations
