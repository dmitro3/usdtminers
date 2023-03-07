import { useCall } from "@usedapp/core";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useCurrentNetwork } from "../../constants";

export const useGetMinStakingValue = (): number => {
  const currentNetwork = useCurrentNetwork();
  const { value: minStakingValue, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getMinStakingValue",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return 0;
  }

  const minStakingValueFormatted: number = minStakingValue
    ? Number(formatEther(minStakingValue[0]))
    : 0;

  return minStakingValueFormatted;
};
