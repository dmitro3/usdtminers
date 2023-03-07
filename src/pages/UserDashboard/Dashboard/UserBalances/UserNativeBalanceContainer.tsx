import { useEtherBalance, useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { CurrentNetworkType, useCurrentNetwork } from "../../../../constants";
import { usePresaleETH_USDPrice } from "../../../../hooks/presale";
import { UserBalanceContainer } from "./UserBalanceContainer";

export const UserNativeBalanceContainer = () => {
  const { account } = useEthers();
  const currentNetwork: CurrentNetworkType = useCurrentNetwork();
  const userNativeBalance: BigNumber | undefined = useEtherBalance(account);
  const getETHPrice = usePresaleETH_USDPrice();
  return (
    <UserBalanceContainer
      balance={
        userNativeBalance
          ? Number(formatEther(userNativeBalance)).toFixed(3)
          : 0
      }
      currency="Native"
      logo={currentNetwork?.NetworkLogoURL}
      price={
        getETHPrice && userNativeBalance
          ? (getETHPrice * Number(formatEther(userNativeBalance))).toFixed(2)
          : 0
      }
      symbol={currentNetwork?.NetworkSymbol}
    ></UserBalanceContainer>
  );
};
