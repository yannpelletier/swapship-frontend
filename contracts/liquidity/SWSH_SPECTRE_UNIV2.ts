import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0x161978e7136b9053C8207709d3d3CCAEBaee6A56'

export default {
  contractName: Ticker.SWSH_SPECTRE_UNIV2,
  address,
  abi
}
