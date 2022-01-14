import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0'

export default {
  contractName: Ticker.SUSHI_ETH_SP,
  address,
  abi
}
