import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0xC3D03e4F041Fd4cD388c549Ee2A29a9E5075882f'

export default {
  contractName: Ticker.DAI_ETH_SP,
  address,
  abi
}
