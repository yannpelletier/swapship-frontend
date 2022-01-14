import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xAAa0B3C19dF2900ee9aC195724c89c2191C7d086'

export default {
  contractName: Ticker.SWSH_RTC_UNIV2,
  address,
  abi
}
