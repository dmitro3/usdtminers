import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetUserStakingEndTime = (
  address: string | undefined,
  stakingID: string
): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getUserStakingEndTime",
        args: [address, stakingID],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  const valueFormatted: number = value ? value[0].toString() : 0;

  return valueFormatted;
};
