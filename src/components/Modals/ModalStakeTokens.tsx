import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { Polygon } from "@usedapp/core";
import { MdAccessTimeFilled } from "react-icons/md";
import {
  PolygonLogo,
  TokenLogo,
  TokenName,
  TokenSymbol,
  USDTLogo,
} from "../../constants";

export const ModalStakeToken = ({
  tokenSymbol,
  tokenLogo,
  userTokenInput,
  stakingDuration,
  cancelButton,
  onClick,
  isLoading,
}: {
  tokenSymbol: string;
  tokenLogo: string;
  userTokenInput?: string;
  stakingDuration: string;
  cancelButton: () => void;
  onClick: () => void;
  isLoading: boolean;
}) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <ModalCloseButton />
      <ModalHeader>You are about to Stake {tokenSymbol}</ModalHeader>
      <ModalBody>
        <Center w="full" py={2}>
          <Divider />
        </Center>
        <VStack w="full">
          <HStack w="full">
            <Image src={tokenLogo} w="30px"></Image>
            <Text>Amount</Text>
            <Spacer />
            <Text lineHeight={1}>
              {userTokenInput && Number(userTokenInput).toFixed(3)}{" "}
              {TokenSymbol}
            </Text>
          </HStack>
          <HStack w="full">
            <Icon
              as={MdAccessTimeFilled}
              w="30px"
              h="30px"
              color="#ff0080"
            ></Icon>
            <Text>Duration</Text>
            <Spacer />
            <Text lineHeight={1}>
              {stakingDuration && Number(stakingDuration) / 86400} Days
            </Text>
          </HStack>
        </VStack>
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
