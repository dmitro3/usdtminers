import {
  Box,
  Center,
  Heading,
  HStack,
  keyframes,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import TokenomicsChart from "./TokenomicsChart";

const TokenomicsChartAnimationKeyFrames = keyframes`
 0% {
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }`;

export const Tokenomics = () => {
  const TokenomicsChartAnimation = `${TokenomicsChartAnimationKeyFrames} infinite 1s`;
  return (
    <VStack w="full" minH="100vh" py={50} spacing={10}>
      <VStack>
        <Text
          fontSize="4xl"
          fontWeight={900}
          bgGradient="linear(to-r, blue, pink.500, yellow.500)"
          bgClip="text"
        >
          Tokenomics
        </Text>
        <HStack>
          <Text textAlign="center" maxW={500} px={5}>
            Our tokenomics are designed to grow & reward our community as well
            as to run the organization smoothly.
          </Text>
        </HStack>
      </VStack>
      <Center
        p={5}
        _before={{
          content: '""',
          borderRadius: "full",
          width: "340px",
          height: "340px",
          border: "5px solid #ff0080",
          position: "absolute",
          zIndex: 0,
          animation: TokenomicsChartAnimation,
        }}
      >
        <TokenomicsChart size="300px"></TokenomicsChart>
      </Center>

      <VStack w={[300, 400]}>
        <HStack w="full">
          <Text>Developer Supply</Text>
          <Spacer />
          <Text>5%</Text>
        </HStack>
        <Progress
          value={5}
          size="lg"
          w={[300, 400]}
          borderRadius="lg"
          bgColor="green.700"
          colorScheme="green"
          h={5}
        ></Progress>
        <HStack w="full">
          <Text>Expension</Text>
          <Spacer />
          <Text>10%</Text>
        </HStack>
        <Progress
          value={10}
          size="lg"
          w={[300, 400]}
          borderRadius="lg"
          bgColor="twitter.700"
          colorScheme="twitter"
          h={5}
        ></Progress>
        <HStack w="full">
          <Text>Staking Rewards</Text>
          <Spacer />
          <Text>15%</Text>
        </HStack>
        <Progress
          value={15}
          size="lg"
          w={[300, 400]}
          borderRadius="lg"
          bgColor="orange.700"
          colorScheme="orange"
          h={5}
        ></Progress>
        <HStack w="full">
          <Text>Burn</Text>
          <Spacer />
          <Text>10%</Text>
        </HStack>
        <Progress
          value={10}
          size="lg"
          w={[300, 400]}
          borderRadius="lg"
          bgColor="pink.700"
          colorScheme="pink"
          h={5}
        ></Progress>
        <HStack w="full">
          <Text>Public Supply</Text>
          <Spacer />
          <Text>60%</Text>
        </HStack>
        <Progress
          value={60}
          size="lg"
          w={[300, 400]}
          borderRadius="lg"
          bgColor="purple.700"
          colorScheme="purple"
          h={5}
        ></Progress>
      </VStack>
    </VStack>
  );
};
