import {
  Center,
  VStack,
  Icon,
  Text,
  Heading,
  Divider,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FcAcceptDatabase, FcIdea, FcSportsMode } from "react-icons/fc";

export const Roadmap2022 = () => {
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
      <Center w={150} borderBottomWidth="thick" py={5}>
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
    <VStack spacing={10}>
      <Heading>2022</Heading>
      <HStack spacing={0} align="flex-start">
        <VStack>
          <RoadMapContainer
            icon={FcIdea}
            date="Q1-2022"
            heading="Idea Stucked"
            text="Ideas stucked in mind & write down everything on paper."
          ></RoadMapContainer>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            icon={FcAcceptDatabase}
            date="Q4-2022"
            heading="Finalize the things"
            text="After a long working hours. Its now time to finalize the things. Preparations are done to ready to dive in the real world with an innovative idea with concrete base."
          ></RoadMapContainer>
        </VStack>
        <Center w={5} h={775}>
          <Divider
            orientation="vertical"
            borderWidth={5}
            borderRadius="full"
          ></Divider>
        </Center>
        <VStack>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            icon={FcSportsMode}
            date="Q2-2022"
            heading="Research & Development"
            text="Started working on & done all research. Gathered team & collaborate with innovative minds."
          ></RoadMapContainer>
        </VStack>
      </HStack>
    </VStack>
  );
};
