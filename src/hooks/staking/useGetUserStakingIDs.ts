import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { BigNumber, BigNumberish } from "ethers";

export const useGetUserStakingIDs = (
  address: string | undefined
): BigNumber[] | [] => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingIDs",
        args: [address],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return [];
  }

  return value ? value[0] : [];
};
