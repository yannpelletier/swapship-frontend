import { Database } from '@vuex-orm/core'

import Exchange from '~/database/models/Exchange'
import exchangeStore from '~/database/models/Exchange/store'

import { Token, RegularToken, LiquidityToken } from '~/database/hierarchies/TokenHierarchy'
import tokenStore from '~/database/models/Token/store'
import regularTokenStore from '~/database/models/RegularToken/store'
import liquidityTokenStore from '~/database/models/LiquidityToken/store'

import Pool from '~/database/models/Pool'
import poolStore from '~/database/models/Pool/store'

import Reward from '~/database/models/Reward'
import rewardStore from '~/database/models/Reward/store'

const database = new Database()
database.register(Exchange, exchangeStore)
database.register(Token, tokenStore)
database.register(RegularToken, regularTokenStore)
// @ts-ignore
database.register(LiquidityToken, liquidityTokenStore)
database.register(Pool, poolStore)
database.register(Reward, rewardStore)

export default database
