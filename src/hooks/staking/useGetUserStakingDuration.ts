import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserStakingDuration = ({
  address,
  stakingID,
}: {
  address: string | undefined;
  stakingID: number;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userStakingDuration, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingDuration",
        args: [address ?? account ?? AddressZero, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const userStakingDurationFormatted = userStakingDuration
    ? Number(formatEther(userStakingDuration))
    : 0;

  return userStakingDurationFormatted;
};
