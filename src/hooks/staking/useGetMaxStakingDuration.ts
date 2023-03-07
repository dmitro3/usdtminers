import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetMaxStakingDuration = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: maxStakingDuration, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getMaxStakingDuration",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return (maxStakingDuration && Number(maxStakingDuration.toString())) ?? 0;
};
