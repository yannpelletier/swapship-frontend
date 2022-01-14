import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0xF1F85b2C54a2bD284B1cf4141D64fD171Bd85539'

export default {
  contractName: Ticker.SUSD_ETH_SP,
  address,
  abi
}
