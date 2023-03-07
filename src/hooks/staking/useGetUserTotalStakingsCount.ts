import { useCall, useEthers } from "@usedapp/core";
import { AddressZero, useCurrentNetwork } from "../../constants";
import { formatEther } from "ethers/lib/utils";

export const useGetUserTotalStakingsCount = ({
  address,
}: {
  address: string | undefined;
}): number | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: userStakingCount, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserTotalStakingsCount",
        args: [address ?? account ?? AddressZero],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const userStakingCountFormatted = userStakingCount
    ? Number(formatEther(userStakingCount))
    : 0;

  return userStakingCountFormatted;
};
