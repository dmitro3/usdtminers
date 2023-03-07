import {
  CircularProgress,
  ModalBody,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const ModalWhenMining = () => {
  return (
    <>
      <ModalHeader textAlign="center">Transaction in process...</ModalHeader>
      <ModalBody>
        <VStack w="full">
          <CircularProgress isIndeterminate color="green.300" />
        </VStack>
      </ModalBody>
    </>
  );
};
