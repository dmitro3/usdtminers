import { Center, Heading, HStack, VStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaDiscord, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <Center w="full" p={5}>
      <VStack>
        <Heading size="lg">Join the community</Heading>
        <HStack>
          <Icon as={FaTwitter} w={7} h={7} cursor="pointer"></Icon>
          <Icon as={FaGithub} w={7} h={7} cursor="pointer"></Icon>
          <Icon as={FaDiscord} w={7} h={7} cursor="pointer"></Icon>
          <Icon as={FaYoutube} w={7} h={7} cursor="pointer"></Icon>
        </HStack>
        <HStack>
          <Text fontSize="x-small"> &copy; 2022-2023</Text>
          <Text
            fontWeight={500}
            // bgGradient="linear(to-r, blue, pink.500, yellow.500)"
            // bgClip="text"
          >
            MaticGold Universe Incorporation.
          </Text>
        </HStack>
      </VStack>
    </Center>
  );
};
