export enum RewardType {
  CORE, // Directly read on chain
  MULTIPLE// Multiple of another value
}

export interface RewardData {
  type: RewardType;
  perBlock?: string;
  parameterTicker?: string;
  parameterMultiplier?: number;
  note?: string;
}

export interface RewardList {
  [ticker: string]: RewardData;
}

const rewardList: RewardList = {
  SWSH: {
    type: RewardType.CORE,
    perBlock: '1000000000000'
  },
  RTC: {
    type: RewardType.MULTIPLE,
    parameterTicker: 'SWSH',
    parameterMultiplier: 10000,
    note: 'This reward was added in order to compensate for the low initial farming yield in SWSH that couldn\'t be changed for the first month due to security measures put in place by the smart contract developper. It will not show up in your account right away after claiming. Instead, it will be airdropped retroactively at some point after claiming.'
  }
}

export default rewardList
