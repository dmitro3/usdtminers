import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetTotalStakers = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: totalStakers, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getTotalStakers",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return totalStakers ? totalStakers.toString() : 0;
};
