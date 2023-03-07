import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  HStack,
  keyframes,
  Text,
  useColorMode,
  VStack,
  Wrap,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Counter } from "../../../components/Counter";
import { PresalePrice, TokenName, TokenSymbol } from "../../../constants/Data";

const StakingAPYButtonKeyframe = keyframes`
 0% {
    opacity: 0.5;
    border-color: #ff0080;
  }
  50% {
    transform: rotate(180deg);
    opacity: 1;
    border-color: blue;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.5;
    border-color: #ff0080;
  }`;

export const PresaleDetails = () => {
  const StakingAPYButtonAnimation = `${StakingAPYButtonKeyframe} infinite 5s`;
  const { colorMode } = useColorMode();
  const naviagte = useNavigate();
  return (
    <VStack
      w="full"
      minH="80vh"
      bgColor={colorMode === "dark" ? "blackAlpha.900" : "gray.100"}
      py={50}
      spacing={10}
    >
      <VStack>
        <Text
          fontSize="4xl"
          fontWeight={900}
          bgGradient="linear(to-r, blue, pink.500, yellow.500)"
          bgClip="text"
        >
          Presale Started
        </Text>
        <HStack>
          <Text textAlign="center" maxW={500} px={5}>
            Participate in presale take the early bird
            <Icon as={FaTwitter} color="#ff0080"></Icon> advantage.
          </Text>
        </HStack>
      </VStack>
      <Wrap spacing={10} justify="center" px={5}>
        <Center
          boxSize={150}
          _before={{
            content: '""',
            borderRadius: "full",
            width: "150px",
            height: "150px",
            border: "5px solid ",
            borderStyle: "dashed",
            position: "absolute",
            zIndex: 0,
            animation: StakingAPYButtonAnimation,
          }}
        >
          <Box>
            <Heading textAlign="center" size="md" color="#ff0080">
              {TokenName}
            </Heading>
            <Text textAlign="center">Name</Text>
          </Box>
        </Center>
        <Center
          boxSize={150}
          _before={{
            content: '""',
            borderRadius: "full",
            width: "150px",
            height: "150px",
            border: "5px solid #ff0080",
            borderStyle: "dashed",
            position: "absolute",
            zIndex: 0,
            animation: StakingAPYButtonAnimation,
          }}
        >
          <Box>
            <Heading textAlign="center" size="lg" color="#ff0080">
              {TokenSymbol}
            </Heading>
            <Text textAlign="center">Symbol</Text>
          </Box>
        </Center>
        <Center
          boxSize={150}
          _before={{
            content: '""',
            borderRadius: "full",
            width: "150px",
            height: "150px",
            border: "5px solid #ff0080",
            borderStyle: "dashed",
            position: "absolute",
            zIndex: 0,
            animation: StakingAPYButtonAnimation,
          }}
        >
          <Box>
            <Heading textAlign="center" size="lg" color="#ff0080">
              150 M
            </Heading>
            <Text textAlign="center">Total Supply</Text>
          </Box>
        </Center>
        <Center
          boxSize={150}
          _before={{
            content: '""',
            borderRadius: "full",
            width: "150px",
            height: "150px",
            border: "5px solid #ff0080",
            borderStyle: "dashed",
            position: "absolute",
            zIndex: 0,
            animation: StakingAPYButtonAnimation,
          }}
        >
          <Box>
            <Heading textAlign="center" size="lg" color="#ff0080">
              {PresalePrice}
            </Heading>
            <Text textAlign="center">ICO Price</Text>
          </Box>
        </Center>
        <Center
          boxSize={150}
          _before={{
            content: '""',
            borderRadius: "full",
            width: "150px",
            height: "150px",
            border: "5px solid #ff0080",
            borderStyle: "dashed",
            position: "absolute",
            zIndex: 0,
            animation: StakingAPYButtonAnimation,
          }}
        >
          <Box>
            <Heading textAlign="center" size="md" color="#ff0080">
              Matic
            </Heading>
            <Heading textAlign="center" size="md" color="#ff0080">
              USDT
            </Heading>
            <Text textAlign="center">Accepted</Text>
            <Text textAlign="center">Currency</Text>
          </Box>
        </Center>
      </Wrap>

      <VStack>
        <Heading size="lg">Presale ends in</Heading>
        <Counter timeinseconds={1680264000} size="md"></Counter>
      </VStack>
      <Button
        borderRadius="3xl"
        bgColor="blue"
        color="white"
        w="300px"
        h="70px"
        fontSize="lg"
        onClick={() => naviagte("swap")}
      >
        Participate in Presale Now
      </Button>
    </VStack>
  );
};
