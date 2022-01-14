import { ExchangeId } from '~/lists/exchanges'
import Ticker from '~/interfaces/enums/Ticker'

export interface LiquidityTokenData {
  name: string;
  decimals: number;
  firstTokenTicker: Ticker;
  secondTokenTicker: Ticker;
  exchangeId: ExchangeId;
}

const GENERIC_DECIMALS = 18

const liquidityPoolsList = {
  [Ticker.USDT_ETH_SP]: {
    name: 'USDT-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.ETH,
    secondTokenTicker: Ticker.USDT,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.USDC_ETH_SP]: {
    name: 'USDC-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.USDC,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.SUSHI_ETH_SP]: {
    name: 'SUSHI-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SUSHI,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.DAI_ETH_SP]: {
    name: 'DAI-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.DAI,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.YFI_ETH_SP]: {
    name: 'YFI-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.YFI,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.LINK_ETH_SP]: {
    name: 'LINK-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.LINK,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.SUSD_ETH_SP]: {
    name: 'sUSD-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SUSD,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.LEND_ETH_SP]: {
    name: 'LEND-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.LEND,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Sushiswap
  },
  [Ticker.DAI_ETH_UNIV2]: {
    name: 'DAI-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.DAI,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.ETH_AMPL_UNIV2]: {
    name: 'ETH-AMPL Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.ETH,
    secondTokenTicker: Ticker.AMPL,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.SWSH_ETH_UNIV2]: {
    name: 'SWSH-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SWSH,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.RTC_ETH_UNIV2]: {
    name: 'RTC-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.RTC,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.LIQLO_ETH_UNIV2]: {
    name: 'LIQLO-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.LIQLO,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.LIQLO_RTC_UNIV2]: {
    name: 'LIQLO-RTC Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.LIQLO,
    secondTokenTicker: Ticker.RTC,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.SWSH_RTC_UNIV2]: {
    name: 'SWSH-RTC Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SWSH,
    secondTokenTicker: Ticker.RTC,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.SWSH_SPECTRE_UNIV2]: {
    name: 'SWSH-SPECTRE Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SWSH,
    secondTokenTicker: Ticker.SPECTRE,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.SPECTRE_RTC_UNIV2]: {
    name: 'SPECTRE-RTC Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SPECTRE,
    secondTokenTicker: Ticker.RTC,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.SPECTRE_ETH_UNIV2]: {
    name: 'SPECTRE-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.SPECTRE,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.WBTC_ETH_UNIV2]: {
    name: 'WBTC-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.WBTC,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.USDT_ETH_UNIV2]: {
    name: 'ETH-USDT Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.ETH,
    secondTokenTicker: Ticker.USDT,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.USDC_ETH_UNIV2]: {
    name: 'USDC-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.USDC,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.UNI_ETH_UNIV2]: {
    name: 'UNI-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.UNI,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  },
  [Ticker.PSHP_ETH_UNIV2]: {
    name: 'PSHP-ETH Pool',
    decimals: GENERIC_DECIMALS,
    firstTokenTicker: Ticker.PSHP,
    secondTokenTicker: Ticker.ETH,
    exchangeId: ExchangeId.Uniswap
  }
}

export default liquidityPoolsList
