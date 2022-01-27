import Exchange from '~/database/models/Exchange'

export default () => {
  Exchange.dispatch('injectExchanges')
}
