import { Context } from '@nuxt/types'

import { SwapIdType } from '~/lists/tokens'
import liquidityTokenData from '~/lists/liquidityTokens'
import LiquidityToken from '~/database/models/LiquidityToken'
import RefreshType from '~/interfaces/enums/RefreshType'
import LoadingStatus from '~/interfaces/enums/LoadingStatus'

const prepareRefreshList = (refreshType: RefreshType) => {
  let whereFunc = (_: LiquidityToken) => false
  if (refreshType === RefreshType.Integral) {
    whereFunc = (_: LiquidityToken) => true
  } else if (refreshType === RefreshType.Failed) {
    whereFunc = (token: LiquidityToken) => token.status === LoadingStatus.Error
  }

  LiquidityToken.update({
    where: whereFunc,
    data: {
      status: LoadingStatus.Loading
    }
  })

  if (refreshType === RefreshType.Integral || RefreshType.Update) {
    return LiquidityToken.query().all()
  } else if (refreshType === RefreshType.Failed) {
    return LiquidityToken.query().where('status', LoadingStatus.Error).all()
  }
}

export default {
  actions: {
    injectTokens(_: any) {
      LiquidityToken.insert({
        data: [
          ...Object.keys(liquidityTokenData).map((ticker) => {
            const data = liquidityTokenData[ticker]
            return {
              ticker,
              ...data
            }
          })
        ]
      })
    },

    async loadOnChainData(_: any, refreshType: RefreshType = RefreshType.Integral) {
      const refreshList: LiquidityToken[] = prepareRefreshList(refreshType)
      await Promise.all(refreshList.map(async (token: LiquidityToken) => {
        const tokenContract = this.$contracts[token.ticker]

        try {
          const results = await Promise.all([
            tokenContract.totalSupply(),
            tokenContract.getReserves()
          ])

          await Promise.all([
            LiquidityToken.update({
              data: {
                ticker: token.ticker,
                totalSupply: results[0].toString(),
                firstTokenLiquidity: results[1]._reserve0.toString(),
                secondTokenLiquidity: results[1]._reserve1.toString(),
                status: LoadingStatus.Loaded
              }
            })
          ])
        } catch (e) {
          if (refreshType === RefreshType.Integral || refreshType === RefreshType.Failed) {
            LiquidityToken.update({
              data: [{
                ticker: token.ticker,
                status: LoadingStatus.Error
              }]
            })
          }
        }
      }))
    },

    openLiquidityPoolPage(_: Context, token: LiquidityToken) {
      const firstTokenSwapId = token.firstToken.swapIdType === SwapIdType.Contract ? this.$contracts[token.firstTokenTicker].address : token.firstToken.ticker
      const secondTokenSwapId = token.secondToken.swapIdType === SwapIdType.Contract ? this.$contracts[token.secondTokenTicker].address : token.secondToken.ticker
      window.open(`${token.exchange.link}${firstTokenSwapId}/${secondTokenSwapId}`, '_blank')
    }
  }
}
