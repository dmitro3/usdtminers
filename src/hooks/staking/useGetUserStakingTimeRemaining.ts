import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserStakingTimeRemaining = ({
  address,
  stakingID,
}: {
  address: string | undefined;
  stakingID: number;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userStakingTimeRemaining, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingTimeRemaining",
        args: [address ?? account ?? AddressZero, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return userStakingTimeRemaining
    ? Number(userStakingTimeRemaining.toString())
    : 0;
};
