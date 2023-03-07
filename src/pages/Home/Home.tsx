import { Box, Image, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";
import { DividerCurved } from "../../assets/DividerCurved";
import { Header } from "./Header";
import { PresaleDetails } from "./PresaleDetails";
import { Roadmap } from "./Raodmap";
import { ReferralReward } from "./ReferralReward";
import { Staking } from "./Staking";
import { TokenDetails } from "./TokenDetails";
import { Tokenomics } from "./Tokenomics";

export const Home = () => {
  const { colorMode } = useColorMode();
  return (
    <VStack w="full" spacing={0} p={0} h="auto">
      <Header />
      <Box w="full" transform="rotate(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>

      <PresaleDetails />
      <Box w="full" transform="rotateY(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>

      <Staking />
      <Box w="full" transform="rotate(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>
      <ReferralReward />
      <Box w="full" transform="rotateY(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>
      <Tokenomics />
      <Box w="full" transform="rotate(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>
      <Roadmap />
      <Box w="full" transform="rotateY(180deg)">
        <DividerCurved
          width="100%"
          color={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
        ></DividerCurved>
      </Box>
    </VStack>
  );
};
