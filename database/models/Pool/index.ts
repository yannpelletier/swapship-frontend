import { Model } from '@vuex-orm/core'
import BigNumber from 'bignumber.js'
import { Token } from '~/database/hierarchies/TokenHierarchy'
import Reward from '~/database/models/Reward'
import Ticker from '~/interfaces/enums/Ticker'
import TokenType from '~/interfaces/enums/TokenType'
import PoolType from '~/interfaces/enums/PoolType'
import LoadingStatus from '~/interfaces/enums/LoadingStatus'

export class Pool extends Model {
  static entity = 'pools'

  static primaryKey = 'pid'

  pid: number;
  name: string;
  tokenBalance: string;
  tokenStaked: string;
  tokenTotalStaked: string;
  tokenApproved: string;
  multiplier: number;

  status: LoadingStatus;

  tokenTicker: string;

  token: Token;
  rewards: Reward[];

  static fields () {
    return {
      // Pool properties
      pid: this.number(null),
      name: this.string(''),
      multiplier: this.number(0),

      // Flow data
      status: this.number(LoadingStatus.Loading),

      // Relationship values
      tokenTicker: this.string(Ticker.None),
      tokenBalance: this.string('0'),
      tokenStaked: this.string('0'),
      tokenTotalStaked: this.string('0'),
      tokenApproved: this.string('0'),

      // Relationships
      token: this.hasOne(Token, 'ticker', 'tokenTicker'),
      rewards: this.hasMany(Reward, 'poolId', 'pid')
    }
  }

  get isActive (): boolean {
    return this.multiplier > 0
  }

  get type (): string {
    const token = Token.query().whereId(this.tokenTicker).first()
    if (token.type === TokenType.REGULAR) {
      return PoolType.VAULT
    } else if (token.type === TokenType.LIQUIDITY) {
      return PoolType.LIQUIDITY
    }
    return ''
  }

  // User staked value
  get stakedValue () {
    return new BigNumber(this.tokenStaked).shiftedBy(-this.token.decimals).multipliedBy(this.token.price).toFixed(3)
  }

  // Total pool staked value
  get totalStakedValue () {
    return new BigNumber(this.tokenTotalStaked).shiftedBy(-this.token.decimals).multipliedBy(this.token.price).toFixed(3)
  }

  get claimableValue () {
    const value = this.rewards.reduce((accumulator: BigNumber, reward: Reward) => {
      return accumulator.plus(reward.claimableValue)
    }, new BigNumber('0'))
    return value.toFixed(3)
  }

  get dailyRewardsValue () {
    const multiplierTotal = Pool.getters('getMultiplierTotal')
    const ratio = this.multiplier / multiplierTotal

    const value = this.rewards.reduce((accumulator: BigNumber, reward: Reward) => {
      return accumulator.plus(reward.dailyRewardsValue)
    }, new BigNumber('0'))
    return value.multipliedBy(ratio).toFixed(3)
  }

  get apy () {
    return new BigNumber(this.dailyRewardsValue).dividedBy(this.totalStakedValue).multipliedBy(100).multipliedBy(365).toFixed(1)
  }

  // Flow Data
  get isLoading () {
    return this.status === LoadingStatus.Loading || this.token.status === LoadingStatus.Loading
  }

  get isError () {
    return this.status === LoadingStatus.Error || this.token.status === LoadingStatus.Error
  }
}

export default Pool
