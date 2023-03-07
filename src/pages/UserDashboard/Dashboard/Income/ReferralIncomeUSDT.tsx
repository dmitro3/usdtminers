import { useEthers } from "@usedapp/core";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { TokenLogo, TokenSymbol, USDTLogo } from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { IncomeContainer } from "./IncomeContainer";

export const ReferralIncomeUSDT = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);

  return (
    <ItemContainer>
      <IncomeContainer
        currency="USDT"
        logo={USDTLogo}
        value={
          userAccount
            ? Number(formatUnits(userAccount?.userTotalIncomeUSD, 6)).toFixed(2)
            : 0
        }
        symbol={"USDT"}
      ></IncomeContainer>
    </ItemContainer>
  );
};
