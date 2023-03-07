import {
  Button,
  HStack,
  Image,
  ModalBody,
  ModalHeader,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract, utils } from "ethers";
import { useEffect, useState } from "react";
import { Allowance, useCurrentNetwork } from "../../constants";

export const ModalApproval = ({
  tokenLogo,
  tokenName,
  tokenInterface,
  spenderAddress,
  tokenInput,
}: {
  tokenLogo: string;
  tokenName: string;
  tokenInterface: Contract;
  spenderAddress: string;
  tokenInput: string;
}) => {
  const toast = useToast();
  const currentNetwork = useCurrentNetwork();
  const [Loading, setLoading] = useState(false);
  const { state: stateApprove, send: sendApprove } = useContractFunction(
    tokenInterface,
    "approve"
  );

  const approve = async () => {
    try {
      setLoading(true);
      await sendApprove(spenderAddress, utils.parseEther(tokenInput), {
        value: "0",
      });
      toast({
        title: "Transaction Approved.",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      toast({
        title: "Error in Approving the transaction.",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (stateApprove.status === "Mining") {
      setLoading(true);
    } else if (stateApprove.status === "Success") {
      setLoading(false);
    }
  }, [stateApprove]);
  return (
    <>
      <ModalHeader textAlign="center">
        <HStack w="full" justify="center">
          <Text>Please approve the transaction.</Text>
        </HStack>
      </ModalHeader>
      <ModalBody>
        <VStack w="full" justify="center">
          <HStack spacing={10}>
            <HStack>
              <Image src={tokenLogo} w="25px"></Image>
              <Text>{tokenName}</Text>
            </HStack>
            <Text>{tokenInput}</Text>
          </HStack>
          <Button onClick={approve} loadingText="Approving" isLoading={Loading}>
            Approve
          </Button>
        </VStack>
      </ModalBody>
    </>
  );
};
