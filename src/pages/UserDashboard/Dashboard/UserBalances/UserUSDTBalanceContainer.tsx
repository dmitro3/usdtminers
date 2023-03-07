import { useEthers, useTokenBalance } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {
  CurrentNetworkType,
  USDTLogo,
  useCurrentNetwork,
} from "../../../../constants";
import { UserBalanceContainer } from "./UserBalanceContainer";

export const UserUSDTBalanceContainer = () => {
  const { account } = useEthers();
  const currentNetwork: CurrentNetworkType = useCurrentNetwork();

  const userUSDBalance: BigNumber | undefined = useTokenBalance(
    currentNetwork?.USDAddress,
    account
  );

  return (
    <UserBalanceContainer
      balance={
        userUSDBalance ? Number(formatUnits(userUSDBalance, 6)).toFixed(3) : 0
      }
      currency="USDT"
      logo={USDTLogo}
      symbol={"USDT"}
      price={
        userUSDBalance ? Number(formatUnits(userUSDBalance, 6)).toFixed(3) : 0
      }
    ></UserBalanceContainer>
  );
};
