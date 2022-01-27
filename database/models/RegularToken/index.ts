import BigNumber from 'bignumber.js'
import { Token, LiquidityToken } from '~/database/hierarchies/TokenHierarchy'
import Pool from '~/database/models/Pool'
import Reward from '~/database/models/Reward'
import Ticker from '~/interfaces/enums/Ticker'

const STABLE_COIN_PRICE = '1'

export class RegularToken extends Token {
  static entity = 'regularTokens'
  static baseEntity = 'tokens'

  static primaryKey = 'ticker'

  stable: boolean;
  ethPair: string;

  static fields() {
    return {
      ...super.fields(),
      stable: this.boolean(false),
      ethPair: this.string(Ticker.None)
    }
  }

  get price() {
    const USDTETHPair = LiquidityToken.query().with(['firstToken', 'secondToken']).find(Ticker.USDT_ETH_UNIV2)
    const ETHCount = new BigNumber(USDTETHPair.firstTokenLiquidity).shiftedBy(-USDTETHPair.firstToken.decimals)
    const USDTCount = new BigNumber(USDTETHPair.secondTokenLiquidity).shiftedBy(-USDTETHPair.secondToken.decimals)
    const ETHPrice = USDTCount.dividedBy(ETHCount)

    if (this.ticker === Ticker.ETH) {
      return ETHPrice.toFixed(3)
    } else if (this.stable) {
      return STABLE_COIN_PRICE
    } else {
      const tokenETHPair = LiquidityToken.query().with(['firstToken', 'secondToken']).find(this.ethPair)
      const firstTokenCount = new BigNumber(tokenETHPair.firstTokenLiquidity).shiftedBy(-tokenETHPair.firstToken.decimals)
      const secondTokenCount = new BigNumber(tokenETHPair.secondTokenLiquidity).shiftedBy(-tokenETHPair.secondToken.decimals)
      if (tokenETHPair.firstTokenTicker === Ticker.ETH) {
        return ETHPrice.multipliedBy(firstTokenCount).dividedBy(secondTokenCount).toFixed(3)
      } else {
        return ETHPrice.multipliedBy(secondTokenCount).dividedBy(firstTokenCount).toFixed(3)
      }
    }
  }

  get image() {
    return require(`~/static/tokens/${this.ticker.toLowerCase()}.png`)
  }

  get claimable(): string {
    const rewards = Reward.query().where('tokenTicker', this.ticker).all()
    return rewards.reduce((accumulator: BigNumber, reward: Reward) => {
      return accumulator.plus(reward.claimable)
    }, new BigNumber('0')).toString()
  }

  get claimableValue(): string {
    return new BigNumber(this.claimable).shiftedBy(-this.decimals).multipliedBy(this.price).toFixed(3)
  }

  get pooled(): string {
    const pools = Pool.query().where('tokenTicker', this.ticker).all()
    const pooledTokens = pools.reduce((accumulator: BigNumber, pool: Pool) => {
      const staked = new BigNumber(pool.tokenStaked)
      return accumulator.plus(staked)
    }, new BigNumber('0'))

    const firstTokenPools = LiquidityToken.query().where('firstTokenTicker', this.ticker).all()
    const pooledFirstTokenPools = firstTokenPools.reduce((accumulator: BigNumber, liquidityToken: LiquidityToken) => {
      const staked = new BigNumber(liquidityToken.pooled)
      const lpTokenRatio = new BigNumber(liquidityToken.firstTokenLiquidity).dividedBy(liquidityToken.totalSupply)
      return accumulator.plus(staked.multipliedBy(lpTokenRatio))
    }, new BigNumber('0'))

    const secondTokenPools = LiquidityToken.query().where('secondTokenTicker', this.ticker).all()
    const pooledSecondTokenPools = secondTokenPools.reduce((accumulator: BigNumber, liquidityToken: LiquidityToken) => {
      const staked = new BigNumber(liquidityToken.pooled)
      const lpTokenRatio = new BigNumber(liquidityToken.secondTokenLiquidity).dividedBy(liquidityToken.totalSupply)
      return accumulator.plus(staked.multipliedBy(lpTokenRatio))
    }, new BigNumber('0'))

    return pooledTokens.plus(pooledFirstTokenPools).plus(pooledSecondTokenPools).toString()
  }

  get pooledValue(): string {
    return new BigNumber(this.pooled).shiftedBy(-this.decimals).multipliedBy(this.price).toFixed(3)
  }

  get totalPooled(): string {
    const pools = Pool.query().where('tokenTicker', this.ticker).all()
    const pooledTokens = pools.reduce((accumulator: BigNumber, pool: Pool) => {
      const staked = new BigNumber(pool.tokenTotalStaked)
      return accumulator.plus(staked)
    }, new BigNumber('0'))

    const firstTokenPools = LiquidityToken.query().where('firstTokenTicker', this.ticker).all()
    const pooledFirstTokenPools = firstTokenPools.reduce((accumulator: BigNumber, liquidityToken: LiquidityToken) => {
      const staked = new BigNumber(liquidityToken.totalPooled)
      const lpTokenRatio = new BigNumber(liquidityToken.firstTokenLiquidity).dividedBy(liquidityToken.totalSupply)
      return accumulator.plus(staked.multipliedBy(lpTokenRatio))
    }, new BigNumber('0'))

    const secondTokenPools = LiquidityToken.query().where('secondTokenTicker', this.ticker).all()
    const pooledSecondTokenPools = secondTokenPools.reduce((accumulator: BigNumber, liquidityToken: LiquidityToken) => {
      const staked = new BigNumber(liquidityToken.totalPooled)
      const lpTokenRatio = new BigNumber(liquidityToken.secondTokenLiquidity).dividedBy(liquidityToken.totalSupply)
      return accumulator.plus(staked.multipliedBy(lpTokenRatio))
    }, new BigNumber('0'))

    return pooledTokens.plus(pooledFirstTokenPools).plus(pooledSecondTokenPools).toString()
  }

  get totalPooledValue(): string {
    return new BigNumber(this.totalPooled).shiftedBy(-this.decimals).multipliedBy(this.price).toFixed(3)
  }

  get marketCap(): string {
    return new BigNumber(this.totalSupply).shiftedBy(-this.decimals).multipliedBy(this.price).toFixed(0)
  }
}

export default RegularToken
