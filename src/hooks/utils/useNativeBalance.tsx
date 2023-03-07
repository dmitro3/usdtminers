import { useEtherBalance, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const useNativeBalance = (address: string | undefined): number => {
  const userNavtiveBalance: BigNumber | undefined = address
    ? useEtherBalance(address)
    : undefined;
  const userFormattedBalance: number = Number(
    formatEther(userNavtiveBalance ?? 0)
  );
  return userFormattedBalance;
};
