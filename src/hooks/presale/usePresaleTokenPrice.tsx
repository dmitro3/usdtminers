import { useCall } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { useCurrentNetwork } from "../../constants/Data";

export const usePresaleTokenPrice = (): number => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.PresaleAddress && {
        contract: currentNetwork?.PresaleInterface,
        method: "getPricePerUSD",
        args: [],
      },
      { refresh: "never" }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return 0;
  }

  const valueFormatted = value ? Number(formatEther(value?.[0])) : 0;

  return valueFormatted;
};
