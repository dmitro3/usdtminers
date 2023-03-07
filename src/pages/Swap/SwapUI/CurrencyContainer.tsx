import { useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export const CurrencyContainer = (props: any) => {
  const { colorMode } = useColorMode();
  return (
    <VStack
      w="full"
      borderRadius="3xl"
      bgColor={colorMode === "light" ? "white" : "transparent"}
      borderWidth={colorMode === "dark" ? "thin" : 0}
      boxShadow="lg"
      p={3}
    >
      {props.children}
    </VStack>
  );
};
