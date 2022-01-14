import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C'

export default {
  contractName: Ticker.YFI_ETH_SP,
  address,
  abi
}
