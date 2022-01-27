import BigNumber from 'bignumber.js'
import { Token } from '~/database/hierarchies/TokenHierarchy'
import Exchange from '~/database/models/Exchange'
import { ExchangeId } from '~/lists/exchanges'
import Pool from '~/database/models/Pool'

export class LiquidityToken extends Token {
  static entity = 'liquidityTokens'
  static baseEntity = 'tokens'

  static primaryKey = 'ticker'

  exchangeId: ExchangeId;

  firstTokenTicker: string;
  firstTokenLiquidity: string;
  secondTokenTicker: string;
  secondTokenLiquidity: string;

  firstToken: Token;
  secondToken: Token;
  exchange: Exchange;

  storeCacheCalls = [];

  static fields() {
    return {
      ...super.fields(),
      // Relationship values
      firstTokenTicker: this.string(''),
      firstTokenLiquidity: this.string('0'),
      secondTokenTicker: this.string(''),
      secondTokenLiquidity: this.string('0'),
      exchangeId: this.string(ExchangeId.None),

      // Relationships
      firstToken: this.hasOne(Token, 'ticker', 'firstTokenTicker'),
      secondToken: this.hasOne(Token, 'ticker', 'secondTokenTicker'),
      exchange: this.hasOne(Exchange, 'id', 'exchangeId')
    }
  }

  get price() {
    const firstPooledAmount = new BigNumber(this.firstTokenLiquidity).shiftedBy(-this.firstToken.decimals)
    const firstPooledValue = firstPooledAmount.multipliedBy(this.firstToken.price)

    const secondPooledAmount = new BigNumber(this.secondTokenLiquidity).shiftedBy(-this.secondToken.decimals)
    const secondPooledValue = secondPooledAmount.multipliedBy(this.secondToken.price)

    const totalSupply = new BigNumber(this.totalSupply).shiftedBy(-this.decimals)

    return firstPooledValue.plus(secondPooledValue).dividedBy(totalSupply).toPrecision(10)
  }

  get pooled(): string {
    const pools = Pool.query().where('tokenTicker', this.ticker).all()
    const pooledTokens = pools.reduce((accumulator: BigNumber, pool: Pool) => {
      const staked = new BigNumber(pool.tokenStaked)
      return accumulator.plus(staked)
    }, new BigNumber('0'))

    return pooledTokens.toString()
  }

  get totalPooled(): string {
    const pools = Pool.query().where('tokenTicker', this.ticker).all()
    const totalPooledTokens = pools.reduce((accumulator: BigNumber, pool: Pool) => {
      const staked = new BigNumber(pool.tokenTotalStaked)
      return accumulator.plus(staked)
    }, new BigNumber('0'))

    return totalPooledTokens.toString()
  }
}

export default LiquidityToken
