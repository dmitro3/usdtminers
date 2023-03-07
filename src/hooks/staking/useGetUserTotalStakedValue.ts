import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserTotalStakedValue = (
  address: string | undefined
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserTotalStakedValue",
        args: [address],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted = value ? Number(formatEther(value?.[0])) : 0;

  return valueFormatted;
};
