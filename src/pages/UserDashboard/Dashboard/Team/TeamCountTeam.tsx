import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { FaUsers } from "react-icons/fa";
import {
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../../constants";
import { useReferralUserAccount } from "../../../../hooks/referral";
import { ItemContainer } from "../ItemContainer";
import { TeamContainer } from "./TeamContainer";

export const TeamCountTeam = () => {
  const { account } = useEthers();
  const userAccount = useReferralUserAccount(account);
  const currentNetwork = useCurrentNetwork();

  return (
    <ItemContainer>
      <TeamContainer
        text="Count"
        icon={FaUsers}
        value={userAccount ? Number(userAccount?.teamCount.toString()) : 0}
        symbol={""}
      ></TeamContainer>
    </ItemContainer>
  );
};
