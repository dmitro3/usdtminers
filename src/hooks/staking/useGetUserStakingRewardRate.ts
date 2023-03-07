import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserStakingRewardRate = ({
  address,
  stakingID,
}: {
  address: string | undefined;
  stakingID: number;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userStakingRewardRate, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingRewardRate",
        args: [address ?? account ?? AddressZero, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const userStakingRewardRateFormatted = userStakingRewardRate
    ? Number(formatEther(userStakingRewardRate))
    : 0;

  return userStakingRewardRateFormatted;
};
