import { Model } from '@vuex-orm/core'

import TokenType from '~/interfaces/enums/TokenType'
import Ticker from '~/interfaces/enums/Ticker'
import { RegularToken, LiquidityToken } from '~/database/hierarchies/TokenHierarchy'
import { SwapIdType } from '~/lists/tokens'

export class Token extends Model {
  static entity = 'tokens'

  static primaryKey = 'ticker'

  ticker: string;
  name: string;
  contract: string;
  swapIdType: SwapIdType;
  balance: string;
  priceInput: string;
  decimals: number;
  status: number;
  totalSupply: string;
  type: TokenType;

  static types () {
    return {
      [TokenType.REGULAR]: RegularToken,
      [TokenType.LIQUIDITY]: LiquidityToken
    }
  }

  static fields () {
    return {
      ticker: this.string(Ticker.None),
      type: this.attr(TokenType.REGULAR),
      name: this.string(''),
      contract: this.string(''),
      swapIdType: this.number(0),
      decimals: this.number(18),
      totalSupply: this.string('0')
    }
  }

  get price () {
    return '0'
  }
}

export default Token
