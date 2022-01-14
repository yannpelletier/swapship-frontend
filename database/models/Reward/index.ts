import { Model } from '@vuex-orm/core'
import BigNumber from 'bignumber.js'
import { Token } from '~/database/hierarchies/TokenHierarchy'
import { RewardType } from '~/lists/rewards'

const BLOCKS_PER_DAY = 6360

export class Reward extends Model {
  static entity = 'rewards'

  id: number;
  tokenTicker: string;
  poolId: number;
  type: RewardType;

  claimableInput: string;

  perBlock: string;
  parameterTicker: string;
  parameterMultiplier: number;

  token: Token;
  parameterTokenReward: Reward;

  static fields () {
    return {
      // Pool properties
      id: this.attr(null),
      tokenTicker: this.string(''),
      poolId: this.number(null),
      type: this.number(null),

      note: this.attr(null),

      // User values
      claimableInput: this.string('0'),

      // Parameters
      perBlock: this.string('0'),
      parameterTicker: this.string(null),
      parameterMultiplier: this.number(null),

      // Relationships
      token: this.hasOne(Token, 'ticker', 'tokenTicker')
    }
  }

  get claimable () {
    if (this.type === RewardType.CORE) {
      return this.claimableInput
    } else if (this.type === RewardType.MULTIPLE) {
      const multipliedRewardToken = Reward.query().where('tokenTicker', this.parameterTicker).where('poolId', this.poolId).with('token').first()
      if (multipliedRewardToken) {
        return new BigNumber(multipliedRewardToken.claimable).shiftedBy(-multipliedRewardToken.token.decimals).multipliedBy(this.parameterMultiplier).shiftedBy(this.token.decimals).toString()
      }
    }

    return '0'
  }

  get claimableValue () {
    return new BigNumber(this.claimable).shiftedBy(-this.token.decimals).multipliedBy(this.token.price).toPrecision(4)
  }

  get dailyRewards () {
    if (this.type === RewardType.CORE) {
      return new BigNumber(this.perBlock).multipliedBy(BLOCKS_PER_DAY)
    } else if (this.type === RewardType.MULTIPLE) {
      const multipliedRewardToken = Reward.query().where('tokenTicker', this.parameterTicker).where('poolId', this.poolId).with('token').first()
      if (multipliedRewardToken) {
        return new BigNumber(multipliedRewardToken.dailyRewards).shiftedBy(-multipliedRewardToken.token.decimals).multipliedBy(this.parameterMultiplier).shiftedBy(this.token.decimals).toString()
      }
    }

    return '0'
  }

  get dailyRewardsValue () {
    return new BigNumber(this.dailyRewards).shiftedBy(-this.token.decimals).multipliedBy(this.token.price).toPrecision(4)
  }
}

export default Reward
