export enum ExchangeId {
  None,
  Uniswap,
  Sushiswap
}

export interface ExchangeData {
  id: ExchangeId;
  name: string;
  liquidityTokenTicker: string;
  image: any;
  link: string;
}

const exchangeList: ExchangeData[] = [
  {
    id: ExchangeId.Uniswap,
    name: 'UniSwap',
    liquidityTokenTicker: 'UNI-V2',
    image: require('~/static/uniswap.png'),
    link: 'https://app.uniswap.org/#/add/'
  },
  {
    id: ExchangeId.Sushiswap,
    name: 'SushiSwap',
    liquidityTokenTicker: 'SLP',
    image: require('~/static/sushiswap.png'),
    link: 'https://exchange.sushiswapclassic.org/#/add/'
  }
]

export default exchangeList
