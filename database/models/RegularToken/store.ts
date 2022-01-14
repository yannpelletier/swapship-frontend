import RegularToken from '~/database/models/RegularToken'
import tokenData, { SwapIdType } from '~/lists/tokens'

export default {
  actions: {
    injectTokens (_: any) {
      RegularToken.insert({
        data: [
          ...Object.keys(tokenData).map((ticker) => {
            const data = tokenData[ticker]
            return {
              ticker,
              ...data
            }
          })
        ]
      })
    },

    buyOnUniswap (_, token: RegularToken) {
      const contractAddress = this.$contracts[token.ticker]._address
      const tokenSwapId = token.swapIdType === SwapIdType.Contract ? contractAddress : token.ticker
      window.open(`https://app.uniswap.org/#/swap?outputCurrency=${tokenSwapId}`)
    }
  }
}
