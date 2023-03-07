import {
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Polygon, useEthers } from "@usedapp/core";
import { getChainById } from "@usedapp/core/dist/esm/src/helpers";
import { useState } from "react";
import { GetLogoByChain, SupportedChains } from "../../constants/Data";

export const UnsupportedNetwork: React.FC = () => {
  const { switchNetwork } = useEthers();
  const [switchingSupportedNetwork, setSwitchingSupportedNetwork] =
    useState(false);
  const toast = useToast();

  const handleSwitchNetwork = async (e) => {
    const chainId = Number(e.target.value);
    try {
      setSwitchingSupportedNetwork(true);
      await switchNetwork(chainId);
      toast({
        title: `You are on ${getChainById(chainId)?.chainName} Network`,
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setSwitchingSupportedNetwork(false);
    } catch (e: any) {
      setSwitchingSupportedNetwork(false);
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack w="full" minH="100vh" p="5%" align="center" justify="center">
      <Heading p={5} textAlign="center">
        Network not supported!
      </Heading>
      ;
      {!switchingSupportedNetwork ? (
        SupportedChains.map((chainId, key) => {
          return (
            <Button
              onClick={handleSwitchNetwork}
              loadingText="Switching"
              spinnerPlacement="end"
              borderRadius="xl"
              key={key}
              rightIcon={<Image src={GetLogoByChain[chainId]} w="20px"></Image>}
              value={chainId}
            >
              Switch to {getChainById(chainId)?.chainName}
            </Button>
          );
        })
      ) : (
        <HStack>
          <Text>Swtiching network</Text>
          <Spinner />
        </HStack>
      )}
    </VStack>
  );
};
