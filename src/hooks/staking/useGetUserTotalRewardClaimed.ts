import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserTotalRewardClaimed = (
  address: string | undefined
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserTotalRewardClaimed",
        args: [address],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted =
    value && Number(formatEther(value?.totalRewardClaimed));

  return valueFormatted;
};
