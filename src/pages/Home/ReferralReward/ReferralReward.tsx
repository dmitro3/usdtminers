import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useClipboard,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { ConnectButton } from "../../../components/ConnectButton";

export const ReferralReward = () => {
  const { colorMode } = useColorMode();
  const { account } = useEthers();
  const userReferrerLink = `${window.location.host}/#/swap/${account}`;
  const { value, onCopy, hasCopied } = useClipboard(userReferrerLink);
  return (
    <VStack
      w="full"
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
          Refer & Earn
        </Text>
        <HStack>
          <Text textAlign="center" maxW={500} px={5}>
            Let's spread the community. Just refer your friends & earn upto 10%
            of rewards as soon as he participate in presale.
          </Text>
        </HStack>
      </VStack>
      <Icon as={FaUsers} w={32} h={32} color="orange.500"></Icon>
      {account ? (
        <VStack>
          <Input isReadOnly value={userReferrerLink} borderRadius="xl"></Input>
          <Button borderRadius="xl" onClick={onCopy}>
            {hasCopied ? "Copied" : "Copy Your Referral Address"}
          </Button>
        </VStack>
      ) : (
        <VStack>
          <Text maxW={500} px={5} textAlign="center" fontSize="lg">
            Please connect your wallet to get your referral link.
          </Text>
          <ConnectButton
            size="lg"
            borderRadius="2xl"
            variant="outline"
          ></ConnectButton>
        </VStack>
      )}

      <VStack>
        <Heading color="#ff0080">Share now</Heading>
        <HStack>
          <Center
            borderWidth="thin"
            borderRadius="full"
            w={14}
            h={14}
            cursor="pointer"
          >
            <Icon as={FaTwitter} w={7} h={7}></Icon>
          </Center>
          <Center
            borderWidth="thin"
            borderRadius="full"
            w={14}
            h={14}
            cursor="pointer"
          >
            <Icon as={FaFacebook} w={7} h={7}></Icon>
          </Center>
          <Center
            borderWidth="thin"
            borderRadius="full"
            w={14}
            h={14}
            cursor="pointer"
          >
            <Icon as={FaInstagram} w={7} h={7}></Icon>
          </Center>
          <Center
            borderWidth="thin"
            borderRadius="full"
            w={14}
            h={14}
            cursor="pointer"
          >
            <Icon as={FaWhatsapp} w={7} h={7}></Icon>
          </Center>
        </HStack>
      </VStack>
    </VStack>
  );
};
