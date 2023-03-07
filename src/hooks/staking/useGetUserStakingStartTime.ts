import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserStakingStartTime = ({
  address,
  stakingID,
}: {
  address: string | undefined;
  stakingID: number;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userStakingStartTime, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingStartTime",
        args: [address ?? account ?? AddressZero, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return userStakingStartTime ? Number(userStakingStartTime.toString()) : 0;
};
