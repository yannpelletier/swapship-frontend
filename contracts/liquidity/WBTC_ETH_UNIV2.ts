import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940'

export default {
  contractName: Ticker.WBTC_ETH_UNIV2,
  address,
  abi
}
