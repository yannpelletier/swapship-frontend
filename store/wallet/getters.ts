import { GetterTree } from 'vuex'
import { WalletState } from '~/store/wallet/state'

const abbreviateAddress: Function = (address: string) => {
    const begin = address.slice(0, 6)
    const end = address.slice(38)
    return `${begin}...${end}`
}

const getters: GetterTree<WalletState, any> = {
    isConnected({ address }) {
        return address !== undefined
    },

    getAddress({ address }) {
        return address
    },
    getAbbreviatedAddress({ address }) {
        return address ? abbreviateAddress(address) : null
    },

    getChainId({ chainId }) {
        return chainId
    }
}

export default getters
