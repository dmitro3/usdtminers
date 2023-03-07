import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";

export const useGetUserStakedValueByStakinID = (
  address: string | undefined,
  stakingID: string
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakedValueByStakinID",
        args: [address, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const returnValue = value ? Number(formatEther(value[0])) : 0;

  return returnValue ?? 0;
};
