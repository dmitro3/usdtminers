import {
  Heading,
  HStack,
  Icon,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { FaPiggyBank } from "react-icons/fa";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { TokenSymbol } from "../../../../constants";
import { useGetStakingRewardAll } from "../../../../hooks/staking/useGetStakingRewardAll";
import { useGetUserTotalRewardClaimed } from "../../../../hooks/staking/useGetUserTotalRewardClaimed";
import { ItemContainer } from "../ItemContainer";

export const TotalPendingStakingReward = () => {
  const { account } = useEthers();
  const userStakingRewardAll = useGetStakingRewardAll(account);
  return (
    <ItemContainer>
      <Stat w="full">
        <StatLabel>Pending Staking Reward</StatLabel>
        <StatNumber>
          <HStack>
            <Heading size="md">
              {userStakingRewardAll ? userStakingRewardAll.toFixed(5) : 0}{" "}
              {TokenSymbol}
            </Heading>
          </HStack>
        </StatNumber>
        {/* {props.price && (
          <StatHelpText fontSize="xl">${props.price}</StatHelpText>
        )} */}
      </Stat>
      <Icon as={GiPayMoney} w={12} h={12} color="green.500"></Icon>
    </ItemContainer>
  );
};
