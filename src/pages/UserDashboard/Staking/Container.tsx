import { useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export const Container = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <VStack
      p={5}
      w={300}
      borderWidth="thin"
      borderRadius={40}
      bgColor={colorMode === "dark" ? "blackAlpha.500" : "gray.200"}
    >
      {children}
    </VStack>
  );
};
