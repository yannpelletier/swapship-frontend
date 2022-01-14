import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_SP_ABI from '~/interfaces/constants/GenericSPABI'

const abi = GENERIC_SP_ABI
const address = '0x5E63360E891BD60C69445970256C260b0A6A54c6'

export default {
  contractName: Ticker.LEND_ETH_SP,
  address,
  abi
}
