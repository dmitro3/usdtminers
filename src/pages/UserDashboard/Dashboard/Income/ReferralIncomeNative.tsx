import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import {
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { IncomeContainer } from "./IncomeContainer";

export const ReferralIncomeNative = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);
  const currentNetwork = useCurrentNetwork();

  return (
    <ItemContainer>
      <IncomeContainer
        currency="Native"
        logo={currentNetwork?.NetworkLogoURL}
        value={
          userAccount
            ? Number(formatEther(userAccount?.userTotalIncomeETH)).toFixed(3)
            : 0
        }
        symbol={currentNetwork?.NetworkSymbol}
      ></IncomeContainer>
    </ItemContainer>
  );
};
