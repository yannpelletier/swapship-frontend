import Ticker from '~/interfaces/enums/Ticker'

export enum SwapIdType {
  Contract,
  Ticker
}

export interface TokenData {
  name: string;
  ethPair?: Ticker;
  stable: boolean;
  swapIdType: SwapIdType; // Whether to use the ticker or the contract in Uniswap and Sushiswap urls
  decimals: number;
  totalSupply?: string;
}

const tokenList = {
  [Ticker.ETH]: {
    name: 'Ether',
    stable: false,
    swapIdType: SwapIdType.Ticker,
    decimals: 18
  },
  [Ticker.USDT]: {
    name: 'Tether',
    stable: true,
    swapIdType: SwapIdType.Contract,
    decimals: 6
  },
  [Ticker.USDC]: {
    name: 'USD Coin',
    stable: true,
    swapIdType: SwapIdType.Contract,
    decimals: 6
  },
  [Ticker.SUSHI]: {
    name: 'Sushi',
    ethPair: Ticker.SUSHI_ETH_SP,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.DAI]: {
    name: 'Dai',
    stable: true,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.YFI]: {
    name: 'Yearn Finance',
    ethPair: Ticker.YFI_ETH_SP,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.LINK]: {
    name: 'Chainlink',
    ethPair: Ticker.LINK_ETH_SP,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.SUSD]: {
    name: 'sUSD',
    stable: true,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.LEND]: {
    name: 'Aave',
    ethPair: Ticker.LEND_ETH_SP,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.AMPL]: {
    name: 'Ampleforth',
    ethPair: Ticker.ETH_AMPL_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 9
  },
  [Ticker.WBTC]: {
    name: 'Wrapped Bitcoin',
    ethPair: Ticker.WBTC_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 8
  },
  [Ticker.UNI]: {
    name: 'Uniswap',
    ethPair: Ticker.UNI_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18
  },
  [Ticker.SWSH]: {
    name: 'SwapShip',
    ethPair: Ticker.SWSH_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18,
    totalSupply: '22000000000000000000000'
  },
  [Ticker.RTC]: {
    name: 'Read This Contract',
    ethPair: Ticker.RTC_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18,
    totalSupply: '33000000000000000000000'
  },
  [Ticker.LIQLO]: {
    name: 'Liquid Lottery',
    ethPair: Ticker.LIQLO_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18,
    totalSupply: '1110000000000000000000'
  },
  [Ticker.SPECTRE]: {
    name: 'Speculative Resistance',
    ethPair: Ticker.SPECTRE_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18,
    totalSupply: '56000000000000000000000'
  },
  [Ticker.PSHP]: {
    name: 'PayShip',
    ethPair: Ticker.PSHP_ETH_UNIV2,
    stable: false,
    swapIdType: SwapIdType.Contract,
    decimals: 18,
    totalSupply: '11000000000000000000000'
  }
}

export default tokenList
