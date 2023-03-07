import { useCall } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { useCurrentNetwork } from "../../constants";

export const useGetStakingReward = (
  address: string | undefined,
  stakingID: string
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getStakingReward",
        args: [address, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted = value ? Number(formatEther(value[0])) : 0;

  return valueFormatted ?? 0;
};
