import Ticker from '~/interfaces/enums/Ticker'
import GENERIC_UNIV2_ABI from '~/interfaces/constants/GenericUNIV2ABI'

const abi = GENERIC_UNIV2_ABI
const address = '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11'

export default {
  contractName: Ticker.DAI_ETH_UNIV2,
  address,
  abi
}
