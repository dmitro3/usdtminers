import { useCall, useEthers } from "@usedapp/core";
import { useCurrentNetwork } from "../../constants";

export const useIsStaked = ({
  address,
}: {
  address?: string | undefined;
}): boolean | undefined => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const { value: isUserStaking, error } =
    useCall(
      currentNetwork?.StakingAddress && {
        contract: currentNetwork?.StakingInterface,
        method: "isStaked",
        args: [address ?? account],
      }
    ) ?? {};

  if (error) {
    console.log(error);
    return undefined;
  }

  return isUserStaking ? isUserStaking[0] : false;
};
