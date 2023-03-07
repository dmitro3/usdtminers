import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";

export const useGetUserRewardClaimedArray = ({
  address,
}: {
  address: string | undefined;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userRewardClaimedArray, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserRewardClaimedArray",
        args: [address ?? account ?? AddressZero],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return userRewardClaimedArray;
};
