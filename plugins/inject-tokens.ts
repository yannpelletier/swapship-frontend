import Token from '~/database/models/Token'

export default () => {
  Token.dispatch('injectTokens')
}
