import { BigNumber } from "ethers";

export type UserAccountMapType = {
  pendingRewardETH: BigNumber;
  pendingRewardUSD: BigNumber;
  pendingRewardStaking: BigNumber;
  referrerAddress: string;
  referredAddresses: string[];
  referredCount: number;
  teamAddress: string[];
  teamCount: number;
  rewardPaidETH: BigNumber[];
  rewardPaidTimeETH: BigNumber[];
  rewardPaidStaking: BigNumber[];
  rewardPaidTimeStaking: BigNumber[];
  rewardPaidUSD: BigNumber[];
  rewardPaidTimeUSD: BigNumber[];
  totalBusinessETH: BigNumber;
  totalBusinessUSD: BigNumber;
};
