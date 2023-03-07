import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetStakingRewardRates = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: stakingRewardRates, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getStakingRewardRates",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return stakingRewardRates ?? [0];
};
