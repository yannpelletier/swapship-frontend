import Pool from '~/database/models/Pool/index'
import poolData, { PoolData } from '~/lists/pools'
import Reward from '~/database/models/Reward'
import rewardData from '~/lists/rewards'
import PoolType from '~/interfaces/enums/PoolType'
import RefreshType from '~/interfaces/enums/RefreshType'
import LoadingStatus from '~/interfaces/enums/LoadingStatus'
import Token from '~/database/models/Token'

const prepareRefreshList = (refreshType: RefreshType) => {
  let whereFunc = (_: Pool) => false
  if (refreshType === RefreshType.Integral) {
    whereFunc = (_: Pool) => true
  } else if (refreshType === RefreshType.Failed) {
    whereFunc = (pool: Pool) => pool.status === LoadingStatus.Error
  }

  Pool.update({
    where: whereFunc,
    data: {
      status: LoadingStatus.Loading
    }
  })

  if (refreshType === RefreshType.Integral || RefreshType.Update) {
    return Pool.query().all()
  } else if (refreshType === RefreshType.Failed) {
    return Pool.query().where('status', LoadingStatus.Error).all()
  }
}

export default {
  actions: {
    async injectPools() {
      await Promise.all([
        Pool.insert({
          data: poolData
        }),

        Reward.insert({
          data: poolData.reduce((accumulator: any[], pdata: PoolData) => {
            return [
              ...accumulator,
              ...Object.keys(rewardData).map((rewardTicker: string) => {
                const rdata = rewardData[rewardTicker]
                return {
                  tokenTicker: rewardTicker,
                  poolId: pdata.pid,
                  ...rdata
                }
              })
            ]
          }, [])
        })
      ])
    },

    async loadOnChainData({ rootGetters }: any, refreshType: RefreshType) {
      const address = rootGetters['wallet/getAddress']
      const captainCookContract = this.$contracts.CaptainCook


      const refreshList: Pool[] = prepareRefreshList(refreshType)
      await Promise.all(refreshList.map(async (pool: Pool) => {
        const tokenContract = this.$contracts[pool.tokenTicker]

        try {
          const results = await Promise.all([
            tokenContract.balanceOf(address),
            captainCookContract.userInfo(pool.pid, address),
            tokenContract.balanceOf(captainCookContract.address),
            tokenContract.allowance(address, captainCookContract.address),
            captainCookContract.pendingSwapShip(pool.pid, address)
          ])

          await Promise.all([
            Pool.update({
              where(p: Pool) {
                return p.pid === pool.pid
              },
              data: {
                tokenBalance: results[0].toString(),
                tokenStaked: results[1].amount.toString(),
                tokenTotalStaked: results[2].toString(),
                tokenApproved: results[3].toString(),
                status: LoadingStatus.Loaded
              }
            }),

            Reward.update({
              where(reward: Reward) {
                return reward.tokenTicker === 'SWSH' && reward.poolId === pool.pid
              },
              data: {
                claimableInput: results[4].toString()
              }
            })
          ])
        } catch (e) {
          if (refreshType === RefreshType.Integral || refreshType === RefreshType.Failed) {
            Pool.update({
              where(p: Pool) {
                return p.pid === pool.pid
              },
              data: {
                status: LoadingStatus.Error
              }
            })
          }
        }
      }))
    },

    async approvePool({ dispatch, rootGetters }, pool: Pool) {
      const address = rootGetters['wallet/getAddress']
      const poolTokenContract = this.$contracts[pool.tokenTicker]
      const captainCookContract = this.$contracts.CaptainCook
      const totalSupply = await poolTokenContract.totalSupply()
      console.log(poolTokenContract)
      poolTokenContract.approve(captainCookContract.address, totalSupply)
      /* .on('confirmation', () => {
        dispatch('updateData', RefreshType.Update, { root: true })
      }) */
    },

    stakeInPool({ dispatch, rootGetters }, { pool, amount }: any) {
      const address = rootGetters['wallet/getAddress']
      const captainCookContract = this.$contracts.CaptainCook
      const adjustedAmount = this.$web3.utils.padLeft(amount, pool.token.decimals)
      captainCookContract.methods.deposit(pool.pid, adjustedAmount)
        .on('confirmation', () => {
          dispatch('updateData', RefreshType.Update, { root: true })
        })
    },

    withdrawAndClaimRewards({ dispatch, rootGetters }, { pool, amount }: any) {
      const address = rootGetters['wallet/getAddress']
      const captainCookContract = this.$contracts.CaptainCook
      const adjustedAmount = this.$web3.utils.padLeft(amount, pool.decimals).toString()
      captainCookContract.withdraw(pool.pid, adjustedAmount, { from: address })
        .on('confirmation', () => {
          dispatch('updateData', RefreshType.Update, { root: true })
        })
    },

    openGetLink(_, pool: Pool) {
      Token.dispatch('openGetLink', pool.token)
    }
  },

  getters: {
    getPools() {
      return Pool
        .query()
        .where('multiplier', (value: number) => { return value >= 1 })
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getVaultPools() {
      return Pool
        .query()
        .where('type', PoolType.VAULT)
        .withAllRecursive()
        .all()
    },

    getRegularPools() {
      return Pool
        .query()
        .where('type', PoolType.LIQUIDITY)
        .where('multiplier', 1)
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getSuperPools() {
      return Pool
        .query()
        .where('type', PoolType.LIQUIDITY)
        .where('multiplier', (value: number) => { return value > 1 })
        .orderBy('multiplier', 'desc')
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getExpiredStakedPools() {
      return Pool
        .query()
        .where('multiplier', 0)
        .where('tokenStaked', (value: string) => { return value !== '0' })
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .all()
    },

    getMultiplierTotal(_: any) {
      return Pool.getters('getPools').reduce((accumulator: number, pool: Pool) => {
        return accumulator + pool.multiplier
      }, 0)
    }
  }
}
