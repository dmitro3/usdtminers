import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Text,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  CoinbaseWalletConnector,
  MetamaskConnector,
  useEthers,
} from "@usedapp/core";
import {
  CoinbaseLogo,
  DeepLinks,
  MetamaskLogo,
  TrustWalletLogo,
  WalletConnectLogo,
} from "../../../constants/Data";
import { useIsMobile } from "../../../constants/Ui";

export const NoAuthDrawer = ({ onClose }: { onClose: () => void }) => {
  const { activateBrowserWallet, activate } = useEthers();

  const isMobile = useIsMobile();
  const toast = useToast();

  const handleConnectMetamask = async () => {
    onClose();
    const MetamaskProvider = new MetamaskConnector();
    if (window.ethereum) {
      try {
        await activate(MetamaskProvider);
      } catch (err: any) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.metamask}`;
    }
  };

  const handleConnectCoinbase = async () => {
    onClose();
    const CoinbaseProvider = new CoinbaseWalletConnector();
    if (window.ethereum) {
      try {
        await activate(CoinbaseProvider);
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.coinbase}`;
    }
  };

  const handleConnectWalletConnect = () => {
    onClose();
    try {
      activateBrowserWallet({ type: "walletConnect" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnectTrustWallet = () => {
    onClose();
    if (window.ethereum) {
      try {
        activateBrowserWallet();
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.trustwallet}`;
    }
  };
  return (
    <Center w="full" flexDirection="column" p={5}>
      <DrawerHeader>Connect Your Wallet</DrawerHeader>
      <Text>Choose from your favourite cryto wallet.</Text>
      <Center maxW={700} w="90%" py={5}>
        <Divider></Divider>
      </Center>
      <DrawerBody>
        <Wrap w="full" align="center" justify="center" pb={50} spacing={5}>
          <VStack>
            <Button
              name="metamask"
              variant="outline"
              borderRadius="xl"
              onClick={handleConnectMetamask}
              size="lg"
              bgImage={MetamaskLogo}
              bgRepeat="no-repeat"
              bgPosition="center"
              bgSize="30px"
              _hover={{
                bgImage: { MetamaskLogo },
              }}
            ></Button>
            <Text fontSize="sm">Metamask</Text>
          </VStack>
          {isMobile && (
            <VStack>
              <Button
                name="trustwallet"
                variant="outline"
                borderRadius="xl"
                onClick={handleConnectTrustWallet}
                size="lg"
                bgImage={TrustWalletLogo}
                bgRepeat="no-repeat"
                bgPosition="center"
                bgSize="30px"
                _hover={{
                  bgImage: { MetamaskLogo },
                }}
              ></Button>
              <Text fontSize="sm">TrustWallet</Text>
            </VStack>
          )}
          <VStack>
            <Button
              name="walletConnect"
              variant="outline"
              borderRadius="xl"
              size="lg"
              bgImage={WalletConnectLogo}
              bgRepeat="no-repeat"
              bgPosition="center"
              bgSize="30px"
              _hover={{
                bgImage: { WalletConnectLogo },
              }}
              onClick={handleConnectWalletConnect}
            ></Button>
            <Text fontSize="sm">WalletConnect</Text>
          </VStack>

          <VStack>
            <Button
              name="coinbase"
              variant="outline"
              borderRadius="xl"
              onClick={handleConnectCoinbase}
              size="lg"
              bgImage={CoinbaseLogo}
              bgRepeat="no-repeat"
              bgPosition="center"
              bgSize="30px"
              _hover={{
                bgImage: { MetamaskLogo },
              }}
            ></Button>
            <Text fontSize="sm">Coinbase</Text>
          </VStack>
        </Wrap>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose} borderRadius="xl">
          Close
        </Button>
        <Button
          as="a"
          href="https://www.blockchain-council.org/blockchain/types-of-crypto-wallets-explained/"
          target="_blank"
          colorScheme="red"
          rightIcon={<ChevronRightIcon />}
          borderRadius="xl"
        >
          what is crypto wallet?
        </Button>
      </DrawerFooter>
    </Center>
  );
};
