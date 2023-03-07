import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import {
  TokenLogo,
  TokenSymbol,
  USDTLogo,
  useCurrentNetwork,
} from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { BusinessContainer } from "./BusinessContainer";

export const BusinessUSD = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);
  const currentNetwork = useCurrentNetwork();

  return (
    <ItemContainer>
      <BusinessContainer
        currency="USDT"
        logo={USDTLogo}
        value={
          userAccount
            ? Number(formatEther(userAccount?.totalBusinessUSD)).toFixed(3)
            : 0
        }
        symbol={"USDT"}
      ></BusinessContainer>
    </ItemContainer>
  );
};
