import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x8a390F95d5AFaA9F6307bE48B84816Ba4B1D9cc7'

export default {
  contractName: Ticker.PSHP_ETH_UNIV2,
  address,
  abi
}
