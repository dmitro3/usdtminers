import { useCall } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useGetTotalTokensStaked = (): number | undefined => {
  const currentNetwork = useCurrentNetwork();
  const { value: totalTokensStaked, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "getTotalTokensStaked",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return totalTokensStaked ? totalTokensStaked.toString() : 0;
};
