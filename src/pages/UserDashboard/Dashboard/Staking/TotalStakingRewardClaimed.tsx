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
import { GiTakeMyMoney } from "react-icons/gi";
import { TokenSymbol } from "../../../../constants";
import { useGetUserTotalRewardClaimed } from "../../../../hooks/staking/useGetUserTotalRewardClaimed";
import { ItemContainer } from "../ItemContainer";

export const TotalStakingRewardClaimed = () => {
  const { account } = useEthers();
  const userTotalStakingRewardClaimed = useGetUserTotalRewardClaimed(account);
  return (
    <ItemContainer>
      <Stat w="full">
        <StatLabel>Staking Reward Claimed</StatLabel>
        <StatNumber>
          <HStack>
            <Heading size="md">
              {userTotalStakingRewardClaimed
                ? userTotalStakingRewardClaimed.toFixed(3)
                : 0}{" "}
              {TokenSymbol}
            </Heading>
          </HStack>
        </StatNumber>
        {/* {props.price && (
          <StatHelpText fontSize="xl">${props.price}</StatHelpText>
        )} */}
      </Stat>
      <Icon as={GiTakeMyMoney} w={12} h={12} color="green.500"></Icon>
    </ItemContainer>
  );
};
