import { Inject, Plugin } from '@nuxt/types/app'
import { Contract, ethers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3ConnectorsManager } from 'web3-connectors-manager'
import contractsData from '~/contracts'

import RefreshType from '~/interfaces/enums/RefreshType'

declare module 'vue/types/vue' {
  interface Vue {
    $ethers: any
    $contracts: any
    $provider: any
    $web3ConnectorsManager: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $ethers: any
    $contracts: any
    $provider: any
    $web3ConnectorsManager: any
  }
  interface Context {
    $ethers: any
    $contracts: any
    $provider: any
    $web3ConnectorsManager: any
  }
}

declare module '@nuxt/types/config/runtime' {
  interface NuxtRuntimeConfig {
    chainId: String
    chainName: String
    chainNameFull: String
    infuraProjectId: String
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $ethers: any
    $contracts: any
    $provider: any
    $web3ConnectorsManager: any
  }
}

const plugin: Plugin = ({ store }, inject: Inject) => {
  inject('ethers', ethers)

  const defaultProvider = new ethers.providers.InfuraProvider(process.env.CHAIN_NAME, process.env.INFURA_PROJECT_ID)
  inject('provider', defaultProvider)

  const contracts: { [name: string]: Contract } = {}
  contractsData.forEach((contractData) => {
    contracts[contractData.contractName] = new ethers.Contract(
      contractData.address,
      contractData.abi,
      defaultProvider
    )
  })
  inject('contracts', contracts)

  try {
    const web3ConnectorsManager = new Web3ConnectorsManager({
      cacheConnector: true,
      connectorOptions: {
        injected: {
          connectorClass: InjectedConnector
        }
      }
    })
    inject('web3ConnectorsManager', web3ConnectorsManager)

    if (web3ConnectorsManager.isConnectorCached) {
      store.dispatch('connect')
    }
  } catch (e) {
    console.log(e)
  }

  /* window.addEventListener(
    'focus',
    function () {
      store.dispatch('updateData', RefreshType.Update)
    },
    false
  ) */

  window.setInterval(function () {
    store.dispatch('updateData', RefreshType.Update)
  }, 60000)
}

export default plugin
