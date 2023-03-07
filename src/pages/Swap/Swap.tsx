import { Center, VStack } from "@chakra-ui/react";
import React from "react";
import { SwapUI } from "./SwapUI/SwapUI";

export const Swap = () => {
  return (
    <Center w="full" minH="100vh">
      <VStack>
        <SwapUI />
      </VStack>
    </Center>
  );
};
