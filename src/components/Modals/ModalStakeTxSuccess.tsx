import {
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiBadgeCheck } from "react-icons/hi";
import { MdAccessTimeFilled } from "react-icons/md";
import { TokenLogo, TokenSymbol } from "../../constants";

export const ModalStakeTxSuccess = ({
  stakingValue,
  stakingDuration,
}: {
  stakingValue: string;
  stakingDuration: string;
}) => {
  return (
    <>
      <ModalCloseButton />
      <ModalHeader textAlign="center">
        <HStack w="full" justify="center">
          <Text>Transaction Success</Text>
          <Icon as={HiBadgeCheck} boxSize="7" color="green.500"></Icon>
        </HStack>
        <Text fontSize="lg" fontWeight="bold" color="#ff0080">
          You staked successfully.
        </Text>
      </ModalHeader>
      <ModalBody>
        <Center w="full" py={2}>
          <Divider />
        </Center>
        <VStack w="full">
          <HStack w="full">
            <Image src={TokenLogo} w="30px"></Image>
            <Text>Amount</Text>
            <Spacer />
            <Text lineHeight={1}>
              {stakingValue && Number(stakingValue).toFixed(3)} {TokenSymbol}
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
    </>
  );
};
