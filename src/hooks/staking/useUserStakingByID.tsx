import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export type userStakingByIDType = {
  valueStaked: number;
  startTime: number;
  endTime: number;
  stakingDuration: number;
  timeLeft: number;
};

export const useUserStakingByID = (
  address: string | undefined,
  stakingID: string | number
): userStakingByIDType | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingByID",
        args: [address, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const userStakingByID: userStakingByIDType | undefined = value
    ? {
        valueStaked: Number(formatEther(value?.valueStaked)),
        startTime: Number(value?.startTime.toString()),
        endTime: Number(value?.endTime.toString()),
        stakingDuration: Number(value?.stakingDuration.toString()),
        timeLeft: Number(value?.timeLeft.toString()),
      }
    : undefined;

  return userStakingByID;
};
