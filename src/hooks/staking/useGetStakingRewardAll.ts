import { useCall } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { useCurrentNetwork } from "../../constants";

export const useGetStakingRewardAll = (
  address: string | undefined
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getStakingRewardAll",
        args: [address],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted = value ? Number(formatEther(value[0])) : 0;

  return valueFormatted ?? 0;
};
