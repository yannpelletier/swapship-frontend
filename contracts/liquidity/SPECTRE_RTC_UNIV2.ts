import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x04b5473D557C59Aa60Eb1ad776240fe82B9810BD'

export default {
  contractName: Ticker.SPECTRE_RTC_UNIV2,
  address,
  abi
}
