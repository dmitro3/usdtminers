import {
  Center,
  Divider,
  Heading,
  HStack,
  Text,
  useColorMode,
  VStack,
  Wrap,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FcAcceptDatabase, FcIdea, FcSportsMode } from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { CgSearchFound } from "react-icons/cg";
import { Roadmap2022 } from "./Roadmap2022";
import { Roadmap2023 } from "./Roadmap2023";
import { Roadmap2024 } from "./Roadmap2024";
export const Roadmap = () => {
  const { colorMode } = useColorMode();

  const RoadMapContainer = ({
    icon,
    date,
    heading,
    text,
  }: {
    icon: IconType;
    date: string;
    heading: string;
    text?: string;
  }) => {
    return (
      <Center w={150} borderBottomWidth="thick">
        <VStack>
          <Icon as={icon} w={10} h={10}></Icon>
          <Text fontWeight={900} p={2} borderRadius="xl" borderWidth="thin">
            {date}
          </Text>
          <Heading size="md" textAlign="center" color="#ff0080">
            {heading}
          </Heading>
          <Text textAlign="center" fontSize="sm">
            {text}
          </Text>
        </VStack>
      </Center>
    );
  };

  const RoadMapDivider = () => {
    return <Center boxSize={150}></Center>;
  };
  return (
    <VStack
      w="full"
      minH="100vh"
      py={50}
      bgColor={colorMode === "dark" ? "rgba(0,0,0,0.92)" : "#EDF2F7"}
      spacing={10}
    >
      <VStack>
        <Text
          fontSize="4xl"
          fontWeight={900}
          bgGradient="linear(to-r, blue, pink.500, yellow.500)"
          bgClip="text"
        >
          Roadmap
        </Text>
        <HStack>
          <Text textAlign="center" maxW={600} px={5}>
            Planing is important but making a roadmap is much more. We have
            devided our goal in smaller destinations & a determination to
            achieve them with deadlines.
          </Text>
        </HStack>
      </VStack>
      <Wrap w="95%" p={5} spacing={20} justify="center">
        <Roadmap2022 />
        <Roadmap2023 />
        <Roadmap2024 />
      </Wrap>
    </VStack>
  );
};
