import { HStack, Icon, ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { HiBadgeCheck } from "react-icons/hi";
import { TokenSymbol, UserTokenBalance } from "../../constants";

export const ModalWhenTxSuccess = () => {
  const { account } = useEthers();
  const userTokenBalance = UserTokenBalance(account);
  return (
    <>
      <ModalHeader textAlign="center">
        <HStack w="full" justify="center">
          <Text>Transaction Success</Text>
          <Icon as={HiBadgeCheck} boxSize="7" color="green.500"></Icon>
        </HStack>
      </ModalHeader>
    </>
  );
};
