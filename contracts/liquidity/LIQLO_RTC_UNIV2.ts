import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xFE830ed3885e655621F8BcFc4d19aBbcA42bFf9c'

export default {
  contractName: Ticker.LIQLO_RTC_UNIV2,
  address,
  abi
}
