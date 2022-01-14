import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xc5be99A02C6857f9Eac67BbCE58DF5572498F40c'

export default {
  contractName: Ticker.ETH_AMPL_UNIV2,
  address,
  abi
}
