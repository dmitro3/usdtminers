import {
  Box,
  Button,
  ButtonProps,
  Drawer,
  DrawerContent,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { shortenAddress, useEthers } from "@usedapp/core";
import { IoIosWallet } from "react-icons/io";
import { useCurrentNetwork } from "../../constants/Data";
import { AuthDrawer } from "./Auth";
import { NoAuthDrawer } from "./NoAuth";

export const ConnectButton = (props: ButtonProps) => {
  const { account } = useEthers();
  const currentNetwork = useCurrentNetwork();
  const {
    isOpen: isOpenModal,
    onOpen: onopenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  return (
    <Button {...props} onClick={onOpenDrawer} w="max">
      {account ? (
        <HStack w="full">
          <Icon as={IoIosWallet} boxSize={5} color="#ff0080"></Icon>
          <Text>{shortenAddress(account)}</Text>
          <Image
            src={currentNetwork?.NetworkLogoURL}
            boxSize={5}
            border="2px solid white"
            borderRadius="full"
            bgColor="white"
          ></Image>
        </HStack>
      ) : (
        "Connect Wallet"
      )}
      <Drawer
        isOpen={isOpenDrawer}
        onClose={onCloseDrawer}
        placement="bottom"
        blockScrollOnMount={false}
      >
        <DrawerContent borderTopRadius="25%" borderTopWidth="thick">
          {account ? (
            <AuthDrawer closeFunction={onCloseDrawer}></AuthDrawer>
          ) : (
            <NoAuthDrawer onClose={onCloseDrawer}></NoAuthDrawer>
          )}
        </DrawerContent>
      </Drawer>
    </Button>
  );
};
