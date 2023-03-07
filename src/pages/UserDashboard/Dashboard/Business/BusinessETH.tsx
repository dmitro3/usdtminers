import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import {
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { BusinessContainer } from "./BusinessContainer";

export const BusinessETH = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);
  const currentNetwork = useCurrentNetwork();

  return (
    <ItemContainer>
      <BusinessContainer
        currency="Native"
        logo={currentNetwork?.NetworkLogoURL}
        value={
          userAccount
            ? Number(formatEther(userAccount?.totalBusinessETH)).toFixed(3)
            : 0
        }
        symbol={currentNetwork?.NetworkSymbol}
      ></BusinessContainer>
    </ItemContainer>
  );
};
