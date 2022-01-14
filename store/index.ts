import database from '@/database'
import VuexORM from '@vuex-orm/core'
import Pool from '~/database/models/Pool'
import Token from '~/database/models/Token'
import RefreshType from '~/interfaces/enums/RefreshType'

export const plugins = [
  VuexORM.install(database)
]

export const strict = false

export const actions = {
  updateData (_: any, refreshType: RefreshType) {
    Pool.dispatch('loadOnChainData', refreshType)
    Token.dispatch('loadOnChainData', refreshType)
  }
}
