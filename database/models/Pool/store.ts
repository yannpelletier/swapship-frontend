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
    async injectPools () {
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

    async loadOnChainData (_: any, refreshType: RefreshType) {
      const address = this.$web3.eth.defaultAccount
      const captainCookContract = this.$contracts.CaptainCook

      const refreshList: Pool[] = prepareRefreshList(refreshType)
      await Promise.all(refreshList.map(async (pool: Pool) => {
        const tokenContract = this.$contracts[pool.tokenTicker]

        try {
          const results = await Promise.all([
            tokenContract.methods.balanceOf(address).call(),
            captainCookContract.methods.userInfo(pool.pid, address).call(),
            tokenContract.methods.balanceOf(captainCookContract._address).call(),
            tokenContract.methods.allowance(address, captainCookContract._address).call(),
            captainCookContract.methods.pendingSwapShip(pool.pid, address).call()
          ])

          await Promise.all([
            Pool.update({
              where (p: Pool) {
                return p.pid === pool.pid
              },
              data: {
                tokenBalance: results[0],
                tokenStaked: results[1].amount,
                tokenTotalStaked: results[2],
                tokenApproved: results[3],
                status: LoadingStatus.Loaded
              }
            }),

            Reward.update({
              where (reward: Reward) {
                return reward.tokenTicker === 'SWSH' && reward.poolId === pool.pid
              },
              data: {
                claimableInput: results[4]
              }
            })
          ])
        } catch (e) {
          if (refreshType === RefreshType.Integral || refreshType === RefreshType.Failed) {
            Pool.update({
              data: [{
                pid: pool.pid,
                status: LoadingStatus.Error
              }]
            })
          }
        }
      }))
    },

    async approvePool ({ dispatch }, pool: Pool) {
      const address = this.$web3.eth.defaultAccount
      const poolTokenContract = this.$contracts[pool.tokenTicker]
      const captainCookContract = this.$contracts.CaptainCook
      const totalSupply = await poolTokenContract.methods.totalSupply().call()
      poolTokenContract.methods.approve(captainCookContract._address, totalSupply).send({ from: address })
        .on('confirmation', () => {
          dispatch('updateData', RefreshType.Update, { root: true })
        })
    },

    stakeInPool ({ dispatch }, { pool, amount }: any) {
      const address = this.$web3.eth.defaultAccount
      const captainCookContract = this.$contracts.CaptainCook
      const adjustedAmount = this.$web3.utils.padLeft(amount, pool.token.decimals)
      captainCookContract.methods.deposit(pool.pid, adjustedAmount).send({ from: address })
        .on('confirmation', () => {
          dispatch('updateData', RefreshType.Update, { root: true })
        })
    },

    withdrawAndClaimRewards ({ dispatch }, { pool, amount }: any) {
      console.log(amount)
      const address = this.$web3.eth.defaultAccount
      const captainCookContract = this.$contracts.CaptainCook
      const adjustedAmount = this.$web3.utils.padLeft(amount, pool.decimals).toString()
      captainCookContract.methods.withdraw(pool.pid, adjustedAmount).send({ from: address })
        .on('confirmation', () => {
          dispatch('updateData', RefreshType.Update, { root: true })
        })
    },

    openGetLink (_, pool: Pool) {
      Token.dispatch('openGetLink', pool.token)
    }
  },

  getters: {
    getPools () {
      return Pool
        .query()
        .where('multiplier', (value: number) => { return value >= 1 })
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getVaultPools () {
      return Pool
        .query()
        .where('type', PoolType.VAULT)
        .withAllRecursive()
        .all()
    },

    getRegularPools () {
      return Pool
        .query()
        .where('type', PoolType.LIQUIDITY)
        .where('multiplier', 1)
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getSuperPools () {
      return Pool
        .query()
        .where('type', PoolType.LIQUIDITY)
        .where('multiplier', (value: number) => { return value > 1 })
        .orderBy('multiplier', 'desc')
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .withAllRecursive()
        .all()
    },

    getExpiredStakedPools () {
      return Pool
        .query()
        .where('multiplier', 0)
        .where('tokenStaked', (value: string) => { return value !== '0' })
        .with(['token.firstToken', 'token.secondToken', 'token.exchange'])
        .all()
    },

    getMultiplierTotal (_: any) {
      return Pool.getters('getPools').reduce((accumulator: number, pool: Pool) => {
        return accumulator + pool.multiplier
      }, 0)
    }
  }
}
