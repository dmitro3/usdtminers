import {
  Box,
  Button,
  Center,
  useColorMode,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import React from "react";

export const ComponentContainer = ({ name, icon, children }) => {
  const { colorMode } = useColorMode();
  return (
    <VStack p={5} spacing={5}>
      <Button
        size="lg"
        borderRadius="xl"
        bgColor="#ff0080"
        color="white"
        rightIcon={icon}
      >
        {name}
      </Button>
      <Wrap
        w="full"
        spacing={5}
        align="center"
        justify="center"
        borderWidth="thin"
        borderRadius="50px"
        p={5}
      >
        {children}
      </Wrap>
    </VStack>
  );
};
