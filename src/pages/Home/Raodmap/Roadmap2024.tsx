import {
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { FcMindMap } from "react-icons/fc";
import { BsHeadsetVr } from "react-icons/bs";

export const Roadmap2024 = () => {
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
          <Icon as={icon} w={10} h={10} color="#ff0080"></Icon>
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
    <VStack spacing={10} py={5}>
      <Heading>2024</Heading>
      <HStack spacing={0} align="flex-start">
        <RoadMapContainer
          date="Q1-2024"
          heading="Mainnet"
          icon={FcMindMap}
          text="Will launch mainnet with zero gas fees blockchain. We will fix the total supply of our coin and income from exchange will be distributed as reward to miners afterwards."
        ></RoadMapContainer>
        <Center w={5} h={500}>
          <Divider
            orientation="vertical"
            borderWidth={5}
            borderRadius="full"
          ></Divider>
        </Center>
        <VStack>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            date="Q2-2024"
            heading="Metaverse"
            icon={BsHeadsetVr}
            text="Will start working for metaverse. As this is a resource extensive task so it will take time. Our target is to launch Metaverse in next 2 years."
          ></RoadMapContainer>
        </VStack>
      </HStack>
    </VStack>
  );
};
