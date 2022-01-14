import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x5eD6f4c59004bEE9f440E84969A93eCcac580B40'

export default {
  contractName: Ticker.SPECTRE_ETH_UNIV2,
  address,
  abi
}
