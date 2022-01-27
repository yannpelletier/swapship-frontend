const state = () => {
  return {
    address: undefined as unknown,
    chainId: undefined as unknown
  }
}

export type WalletState = ReturnType<typeof state>

export default state
