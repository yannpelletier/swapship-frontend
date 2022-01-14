import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852'

export default {
  contractName: Ticker.USDT_ETH_UNIV2,
  address,
  abi
}
