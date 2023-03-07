import { Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { TokenSymbol } from "../../../constants";
import { StakingUI } from "./StakingUI";

export const StakingNotActive = () => {
  return (
    <VStack w="full" minH="100vh" spacing={10}>
      <Center w="full">
        <Heading>Stake {TokenSymbol}</Heading>
      </Center>
      <StakingUI />
    </VStack>
  );
};
