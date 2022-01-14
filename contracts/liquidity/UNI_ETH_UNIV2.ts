import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xd3d2E2692501A5c9Ca623199D38826e513033a17'

export default {
  contractName: Ticker.UNI_ETH_UNIV2,
  address,
  abi
}
