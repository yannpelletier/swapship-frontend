import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0x06da0fd433C1A5d7a4faa01111c044910A184553'

export default {
  contractName: Ticker.USDT_ETH_SP,
  address,
  abi
}
