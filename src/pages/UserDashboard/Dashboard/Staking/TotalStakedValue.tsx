import {
  Heading,
  HStack,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Icon,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { FaPiggyBank } from "react-icons/fa";
import { TokenSymbol } from "../../../../constants";
import { useGetUserTotalRewardClaimed } from "../../../../hooks/staking/useGetUserTotalRewardClaimed";
import { useGetUserTotalStakedValue } from "../../../../hooks/staking/useGetUserTotalStakedValue";
import { ItemContainer } from "../ItemContainer";

export const TotalStakedValue = () => {
  const { account } = useEthers();
  const userTotalStakedValue = useGetUserTotalStakedValue(account);

  return (
    <ItemContainer>
      <Stat w="full">
        <StatLabel>Total Tokens Staked</StatLabel>
        <StatNumber>
          <HStack>
            <Heading size="md">
              {userTotalStakedValue ? userTotalStakedValue.toFixed(3) : 0}{" "}
              {TokenSymbol}
            </Heading>
          </HStack>
        </StatNumber>
        {/* {props.price && (
          <StatHelpText fontSize="xl">${props.price}</StatHelpText>
        )} */}
      </Stat>
      <Icon as={FaPiggyBank} w={12} h={12} color="#ff0080"></Icon>
    </ItemContainer>
  );
};
