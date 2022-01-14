import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0xC40D16476380e4037e6b1A2594cAF6a6cc8Da967'

export default {
  contractName: Ticker.LINK_ETH_SP,
  address,
  abi
}
