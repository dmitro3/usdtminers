import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { FaUser } from "react-icons/fa";
import {
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { TeamContainer } from "./TeamContainer";

export const TeamCountDirect = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);
  const currentNetwork = useCurrentNetwork();

  return (
    <ItemContainer>
      <TeamContainer
        text="Direct Count"
        icon={FaUser}
        value={userAccount ? Number(userAccount?.referredCount.toString()) : 0}
        symbol={""}
      ></TeamContainer>
    </ItemContainer>
  );
};
