import Token from '~/database/models/Token/index'
import RegularToken from '~/database/models/RegularToken'
import Ticker from '~/interfaces/enums/Ticker'
import LiquidityToken from '~/database/models/LiquidityToken'
import RefreshType from '~/interfaces/enums/RefreshType'
import TokenType from '~/interfaces/enums/TokenType'

export default {
  actions: {
    injectTokens () {
      RegularToken.dispatch('injectTokens')
      LiquidityToken.dispatch('injectTokens')
    },

    loadOnChainData (_, refreshType: RefreshType) {
      LiquidityToken.dispatch('loadOnChainData', refreshType)
    },

    openGetLink (_, token: Token) {
      if (token.type === TokenType.REGULAR) {
        RegularToken.dispatch('buyOnUniswap', token)
      } else if (token.type === TokenType.LIQUIDITY) {
        LiquidityToken.dispatch('openLiquidityPoolPage', token)
      }
    }
  },

  getters: {
    getRTCTokens () {
      return RegularToken
        .query()
        .findIn([
          Ticker.RTC,
          Ticker.LIQLO,
          Ticker.SWSH,
          Ticker.SPECTRE,
          Ticker.PSHP
        ])
    },

    getRegularTokens () {
      return RegularToken
        .query()
        .all()
    },

    getTokens () {
      return Token
        .query()
        .with(['firstToken', 'secondToken', 'exchange'])
        .all()
    },

    getPooledTokens () {
      return RegularToken
        .query()
        .where('pooled', (value: string) => value !== '0')
        .withAllRecursive()
        .all()
    }
  }
}
