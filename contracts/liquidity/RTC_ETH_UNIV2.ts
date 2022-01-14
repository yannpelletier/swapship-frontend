import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xfde42A9422Cb0eE84edE728AB503487B382d135E'

export default {
  contractName: Ticker.RTC_ETH_UNIV2,
  address,
  abi
}
