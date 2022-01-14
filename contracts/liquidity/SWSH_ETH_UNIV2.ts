import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x96fbE9F3B2305F38f7F26264cEc6f2E7EefE0234'

export default {
  contractName: Ticker.SWSH_ETH_UNIV2,
  address,
  abi
}
