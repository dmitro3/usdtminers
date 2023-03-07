import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetTotalRewardsDistributed = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: totalStakingRewardsDistributed, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getTotalRewardsDistributed",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return totalStakingRewardsDistributed
    ? totalStakingRewardsDistributed.toString()
    : 0;
};
