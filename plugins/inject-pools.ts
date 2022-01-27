import Pool from '~/database/models/Pool'

export default () => {
  Pool.dispatch('injectPools')
}
