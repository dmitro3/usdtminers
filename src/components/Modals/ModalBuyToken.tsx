import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Polygon } from "@usedapp/core";
import {
  PolygonLogo,
  TokenLogo,
  TokenName,
  TokenSymbol,
  USDTLogo,
} from "../../constants";

export const ModalBuyToken = ({
  selectedCoinName,
  selectedCoinImage,
  userInputETH,
  userTokenInput,
  cancelButton,
  onClick,
  isLoading,
}: {
  selectedCoinName: string | undefined;
  selectedCoinImage: string;
  userInputETH: number;
  userTokenInput: number;
  cancelButton: () => void;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <ModalCloseButton />
      <ModalHeader>
        <VStack spacing={0}>
          <Text textAlign="center" fontSize="2xl">
            You are about to swap
          </Text>
          <Heading
            size="lg"
            textAlign="center"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            {TokenName} Tokens
          </Heading>
        </VStack>
      </ModalHeader>
      <ModalBody>
        <Divider />
        <VStack py={5}>
          <Text fontWeight="bold" lineHeight={1}>
            Paying {selectedCoinName}
          </Text>
          <Text fontWeight="bold" fontSize="2xl" lineHeight={1}>
            {userInputETH.toFixed(5)}
          </Text>
          <Image
            src={selectedCoinImage}
            w="50px"
            borderRadius="full"
            p={2}
            borderWidth="thin"
            borderStyle="solid"
          ></Image>

          <ArrowDownIcon />
          <Image
            src={TokenLogo}
            w="70px"
            borderRadius="full"
            p={2}
            borderWidth="thin"
            borderStyle="solid"
          ></Image>

          <Text fontWeight="bold" lineHeight={1}>
            Receiving {TokenSymbol}
          </Text>
          <Text fontWeight="bold" fontSize="2xl" lineHeight={1}>
            {userTokenInput.toFixed(5)}
          </Text>
        </VStack>
        <Spacer />
      </ModalBody>

      <ModalFooter>
        <HStack>
          <Button variant="ghost" onClick={cancelButton} colorScheme="red">
            Cancel
          </Button>
          <Button
            bgColor="#ff0080"
            mr={3}
            onClick={onClick}
            isLoading={isLoading}
            color="white"
          >
            Confirm
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};
