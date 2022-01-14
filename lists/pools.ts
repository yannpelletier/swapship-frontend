import Ticker from '~/interfaces/enums/Ticker'

export interface PoolData {
  pid: number; // Must match pool id of the Captain Cook contract
  name: string;
  multiplier: number;
  tokenTicker: Ticker;
}

const liquidityPoolsList: PoolData[] = [
  {
    pid: 0,
    name: 'USDT-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.USDT_ETH_SP
  },
  {
    pid: 1,
    name: 'USDC-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.USDC_ETH_SP
  },
  {
    pid: 2,
    name: 'SUSHI-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.SUSHI_ETH_SP
  },
  {
    pid: 3,
    name: 'DAI-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.DAI_ETH_SP
  },
  {
    pid: 4,
    name: 'YFI-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.YFI_ETH_SP
  },
  {
    pid: 5,
    name: 'LINK-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.LINK_ETH_SP
  },
  {
    pid: 6,
    name: 'sUSD-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.SUSD_ETH_SP
  },
  {
    pid: 7,
    name: 'LEND-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.LEND_ETH_SP
  },
  {
    pid: 8,
    name: 'DAI-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.DAI_ETH_UNIV2
  },
  {
    pid: 9,
    name: 'AMPL-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.ETH_AMPL_UNIV2
  },
  {
    pid: 10,
    name: 'SWSH-ETH Pool',
    multiplier: 5,
    tokenTicker: Ticker.SWSH_ETH_UNIV2
  },
  {
    pid: 11,
    name: 'RTC-ETH Pool',
    multiplier: 10,
    tokenTicker: Ticker.RTC_ETH_UNIV2
  },
  {
    pid: 12,
    name: 'LIQLO-ETH Pool',
    multiplier: 10,
    tokenTicker: Ticker.LIQLO_ETH_UNIV2
  },
  {
    pid: 13,
    name: 'LIQLO-RTC Pool',
    multiplier: 0,
    tokenTicker: Ticker.LIQLO_RTC_UNIV2
  },
  {
    pid: 14,
    name: 'SWSH-RTC Pool',
    multiplier: 0,
    tokenTicker: Ticker.SWSH_RTC_UNIV2
  },
  {
    pid: 15,
    name: 'SWSH-SPECTRE Pool',
    multiplier: 0,
    tokenTicker: Ticker.SWSH_SPECTRE_UNIV2
  },
  {
    pid: 16,
    name: 'SPECTRE-RTC Pool',
    multiplier: 0,
    tokenTicker: Ticker.SPECTRE_RTC_UNIV2
  },
  {
    pid: 17,
    name: 'SPECTRE-ETH Pool',
    multiplier: 5,
    tokenTicker: Ticker.SPECTRE_ETH_UNIV2
  },

  {
    pid: 18,
    name: 'WBTC-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.WBTC_ETH_UNIV2
  },
  {
    pid: 19,
    name: 'ETH-USDT Pool',
    multiplier: 1,
    tokenTicker: Ticker.USDT_ETH_UNIV2
  },
  {
    pid: 20,
    name: 'USDC-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.USDC_ETH_UNIV2
  },
  {
    pid: 21,
    name: 'UNI-ETH Pool',
    multiplier: 1,
    tokenTicker: Ticker.UNI_ETH_UNIV2
  },
  {
    pid: 22,
    name: 'PSHP-ETH Pool',
    multiplier: 5,
    tokenTicker: Ticker.PSHP_ETH_UNIV2
  },
  {
    pid: 23,
    name: 'RTC Vault',
    multiplier: 2,
    tokenTicker: Ticker.RTC
  },
  {
    pid: 24,
    name: 'LIQLO Vault',
    multiplier: 2,
    tokenTicker: Ticker.LIQLO
  },
  {
    pid: 25,
    name: 'SPECTRE Vault',
    multiplier: 2,
    tokenTicker: Ticker.SPECTRE
  },
  {
    pid: 26,
    name: 'SWSH Vault',
    multiplier: 2,
    tokenTicker: Ticker.SWSH
  },
  {
    pid: 27,
    name: 'PSHP Vault',
    multiplier: 2,
    tokenTicker: Ticker.PSHP
  }
]

export default liquidityPoolsList
