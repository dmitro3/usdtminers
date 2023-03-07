import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserTotalRewardClaimedCount = ({
  address,
}: {
  address: string | undefined;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userTotalRewardCount, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserTotalRewardClaimedCount",
        args: [address ?? account ?? AddressZero],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return userTotalRewardCount ? Number(userTotalRewardCount.toString()) : 0;
};
