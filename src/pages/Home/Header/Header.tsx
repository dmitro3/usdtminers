import {
  Button,
  Heading,
  Highlight,
  HStack,
  Image,
  Spacer,
  Text,
  useColorMode,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { HeaderHero, HeaderBlob, HeaderBg } from "../../../assets";

const ImageMotion = motion(Image);

export const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <VStack w="full" minH="80vh" align="center" justify="center" pt={150}>
      <Wrap align="center" justify="center" spacing={10}>
        <VStack align="center" justify="center">
          <Text
            fontSize="5xl"
            fontWeight={900}
            lineHeight={1}
            bgGradient="linear(to-r, blue, pink.500, yellow.500)"
            bgClip="text"
            align="center"
          >
            #MaticGold Universe
          </Text>
          <Text
            fontSize={["2xl", "2xl", "3xl"]}
            fontWeight="extrabold"
            maxW="700px"
            color={colorMode === "dark" ? "gray.300" : "gray.800"}
            align="center"
          >
            A decentralized universe of commodity exchange with security &
            transparency.
          </Text>
          <HStack>
            <Button
              size="lg"
              borderRadius="full"
              variant="outline"
              colorScheme="pink"
            >
              Buy Now
            </Button>
            <Button size="lg" borderRadius="full" variant="outline">
              Explore more
            </Button>
          </HStack>
        </VStack>
        <ImageMotion
          src={HeaderHero}
          w={[350, 450]}
          animate={{
            y: [10, 0, 10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          p={10}
        ></ImageMotion>
      </Wrap>
    </VStack>
  );
};
