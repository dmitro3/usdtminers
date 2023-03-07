import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetMinStakingDuration = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: minStakingDuration, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getMinStakingDuration",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return (minStakingDuration && Number(minStakingDuration.toString())) ?? 0;
};
