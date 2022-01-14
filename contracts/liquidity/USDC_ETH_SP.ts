import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0x397FF1542f962076d0BFE58eA045FfA2d347ACa0'

export default {
  contractName: Ticker.USDC_ETH_SP,
  address,
  abi
}
