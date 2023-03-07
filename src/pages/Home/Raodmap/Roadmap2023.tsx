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
import {
  FcAdvertising,
  FcAreaChart,
  FcBullish,
  FcComboChart,
  FcCurrencyExchange,
  FcNeutralDecision,
} from "react-icons/fc";

export const Roadmap2023 = () => {
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
      <Heading>2023</Heading>
      <HStack spacing={0} align="flex-start">
        <VStack>
          <RoadMapContainer
            date="Q1-2023"
            heading="Presale Started"
            icon={FcAdvertising}
            text="We have launched towards our goals. Presale started for early belivers & also an opportunity of growing together."
          ></RoadMapContainer>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            date="Q3-2023"
            heading="NFT Launch"
            icon={FcNeutralDecision}
            text="NFT is the upcoming future which solves many today's problems. We are working on greate NFT Arts & collaborating with artist to launch own NFT & NFT Platform."
          ></RoadMapContainer>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            date="Q4-2023"
            heading="Commodity Exchange"
            icon={FcCurrencyExchange}
            text="Will launch commodity exchange."
          ></RoadMapContainer>
        </VStack>
        <Center w={5} h={1325}>
          <Divider
            orientation="vertical"
            borderWidth={5}
            borderRadius="full"
          ></Divider>
        </Center>
        <VStack>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            date="Q2-2023"
            heading="Exchange Listings"
            icon={FcBullish}
            text="Will start exchange listings. We will not flood the exchange with excess supply and will give opportunity to our early investors to exist first, so that they can get maximum returns on their investments."
          ></RoadMapContainer>
          <RoadMapDivider></RoadMapDivider>
          <RoadMapContainer
            date="Q3-2023"
            heading="Crypto Exchange"
            icon={FcComboChart}
            text="Currently centralised exchanges are dominating the crypto industry, but as we think hybrid decentralized exchanges are neccessity in todays world to protect the users right with more transparency. Build a complete decentralized crypto exchange with zero gas fees is going on & should launch this on time."
          ></RoadMapContainer>
        </VStack>
      </HStack>
    </VStack>
  );
};
