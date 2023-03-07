import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserTotalRewardClaimedTimeStampArray = ({
  address,
}: {
  address: string | undefined;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userTotalRewardClaimedTimeStampArray, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserTotalRewardClaimedTimeStampArray",
        args: [address ?? account ?? AddressZero],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return userTotalRewardClaimedTimeStampArray
    ? Number(userTotalRewardClaimedTimeStampArray.toString())
    : 0;
};
