import { useCall } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React, { memo, useEffect, useState } from "react";
import {
  useCurrentNetwork,
  useReadPresaleContract,
} from "../../constants/Data";

export const usePresaleMinContribution = () => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.PresaleAddress && {
        contract: currentNetwork?.PresaleInterface,
        method: "minContribution",
        args: [],
      },
      { refresh: "never" }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value;
};
