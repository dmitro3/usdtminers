import { useCall } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { useCurrentNetwork } from "../../constants";

export type useStakingCappingType = {
  minTokensToStake: number;
  minDurationToStake: number;
  maxDurationToStake: number;
};

export const useStakingCapping = (): useStakingCappingType | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getStakingCapping",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted: useStakingCappingType | undefined = value
    ? {
        minTokensToStake: Number(formatEther(value?.minTokensToStake)),
        minDurationToStake: Number(value?.minDurationToStake.toString()),
        maxDurationToStake: Number(value?.maxDurationToStake.toString()),
      }
    : undefined;

  return valueFormatted;
};
