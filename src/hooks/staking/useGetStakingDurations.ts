import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetStakingDurations = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: stakingDurations, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getMinStakingValue",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return (stakingDurations && [stakingDurations]) ?? 0;
};
