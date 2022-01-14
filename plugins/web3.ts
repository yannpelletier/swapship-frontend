import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { Inject } from '@nuxt/types/app'
import contracts from '~/contracts'

import RefreshType from '~/interfaces/enums/RefreshType'

declare global {
  interface Window { ethereum: any; }
}

export default async ({ store }, inject: Inject) => {
  const provider = await detectEthereumProvider()
  const web3 = new Web3(provider)
  inject('web3', web3)
  inject('contracts', contracts(web3))

  store.dispatch('accounts/refreshAccount', async () => {
    await store.dispatch('updateData', RefreshType.Integral)
  })

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
      store.dispatch('accounts/refreshAccount', async () => {
        await store.dispatch('updateData', RefreshType.Integral)
      })
    })

    window.addEventListener('focus', function () {
      store.dispatch('updateData', RefreshType.Update)
    }, false)

    window.setTimeout(function () {
      store.dispatch('updateData', RefreshType.Update)
    }, 60000)
  }
}
