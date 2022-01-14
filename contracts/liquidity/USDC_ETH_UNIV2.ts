import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc'

export default {
  contractName: Ticker.USDC_ETH_UNIV2,
  address,
  abi
}
