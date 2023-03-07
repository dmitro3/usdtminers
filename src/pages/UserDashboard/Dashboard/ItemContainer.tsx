import { Box, Center, HStack, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export const ItemContainer = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <HStack
      p={5}
      borderWidth="thin"
      borderRadius="3xl"
      spacing={10}
      w="full"
      maxW={400}
      boxShadow="base"
      bgColor={colorMode === "dark" ? "blackAlpha.800" : "gray.100"}
    >
      {children}
    </HStack>
  );
};
