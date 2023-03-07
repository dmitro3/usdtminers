import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { TokenLogo, TokenSymbol } from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { IncomeContainer } from "./IncomeContainer";

export const ReferralIncomeStaking = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);

  return (
    <ItemContainer>
      <IncomeContainer
        currency="Staking"
        logo={TokenLogo}
        value={
          userAccount
            ? Number(formatEther(userAccount?.userTotalIncomeStaking)).toFixed(
                3
              )
            : 0
        }
        symbol={TokenSymbol}
      ></IncomeContainer>
    </ItemContainer>
  );
};
