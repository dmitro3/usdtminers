import { useEthers, useTokenBalance } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import {
  CurrentNetworkType,
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../../constants";
import { UserBalanceContainer } from "./UserBalanceContainer";

export const UserTokenBalanceContainer = () => {
  const { account } = useEthers();
  const currentNetwork: CurrentNetworkType = useCurrentNetwork();

  const userTokenBalance: BigNumber | undefined = useTokenBalance(
    currentNetwork?.TokenAddress,
    account
  );

  return (
    <UserBalanceContainer
      balance={
        userTokenBalance ? Number(formatEther(userTokenBalance)).toFixed(3) : 0
      }
      currency="Token"
      logo={TokenLogo}
      symbol={TokenSymbol}
    ></UserBalanceContainer>
  );
};
