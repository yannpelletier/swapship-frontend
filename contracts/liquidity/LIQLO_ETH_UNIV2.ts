import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xd18aea36557ade95d23fb051b68443dd99b1b663'

export default {
  contractName: Ticker.LIQLO_ETH_UNIV2,
  address,
  abi
}
