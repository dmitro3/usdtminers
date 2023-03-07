import {
  Falsy,
  useEtherBalance,
  useTokenBalance as useTokenUseDappHook,
  useEthers,
} from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { AddressZero, useCurrentNetwork } from "../../constants";

export const useTokenBalance = (address: string | undefined): number => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const userTokenBalance: BigNumber | undefined = useTokenUseDappHook(
    currentNetwork?.TokenAddress,
    address ?? account
  );
  const userFormattedBalance: number = Number(
    formatEther(userTokenBalance ?? 0)
  );
  return userFormattedBalance;
};
