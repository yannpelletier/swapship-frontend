import Exchange from '~/database/models/Exchange/index'
import exchangeData from '~/lists/exchanges'

export default {
  actions: {
    injectExchanges (_: any) {
      Exchange.insert({
        data: exchangeData
      })
    }
  }
}
