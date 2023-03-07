import {
  Button,
  ButtonProps,
  VStack,
  IconProps,
  Icon,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MetamaskConnector, useEthers } from "@usedapp/core";
import React from "react";
import {
  CoinbaseLogo,
  DeepLinks,
  MetamaskLogo,
  TrustWalletLogo,
  useIsMobile,
  WalletConnectLogo,
} from "../../constants";
import { useFirebase } from "../../firebase";

export const ConnectWalletPage: React.FC = () => {
  const { activateBrowserWallet, activate } = useEthers();
  const { anonymousLogin }: any = useFirebase();
  const isMobile = useIsMobile();

  const handleConnectMetamask = () => {
    const MetamaskProvider = new MetamaskConnector();
    if (window.ethereum) {
      try {
        activate(MetamaskProvider);
      } catch (err: any) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.metamask}`;
    }
  };

  const handleConnectCoinbase = () => {
    if (window.ethereum) {
      try {
        activateBrowserWallet({ type: "coinbase" });
      } catch (err) {
        console.log(err);
      }
    } else {
      window.location.href = `${DeepLinks.coinbase}`;
    }
  };

  const handleConnectWalletConnect = () => {
    try {
      activateBrowserWallet({ type: "walletConnect" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnectTrustWallet = () => {
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

  const ConnectButton = ({
    name,
    text,
    src,
    onClick,
  }: {
    name: string;
    text: string;
    src?: any;
    onClick: () => void;
  }) => {
    return (
      <Button
        name={name}
        onClick={onClick}
        variant="outline"
        w="full"
        leftIcon={<Image src={src} w={25} />}
        borderRadius="xl"
      >
        {text}
      </Button>
    );
  };
  return (
    <VStack w="full" minH="100vh" py={100}>
      <Heading py={50} textAlign="center">
        Please connect wallet to continue...
      </Heading>
      <VStack p={5} borderWidth="thin" borderRadius="3xl">
        <VStack w="300px">
          <ConnectButton
            name="metamsk"
            text="Metamask"
            src={MetamaskLogo}
            onClick={() => handleConnectMetamask()}
          ></ConnectButton>
          {isMobile && (
            <ConnectButton
              name="trustwallet"
              text="Trust Wallet"
              src={TrustWalletLogo}
              onClick={() => handleConnectTrustWallet()}
            ></ConnectButton>
          )}

          <ConnectButton
            name="coinbase"
            text="Coinbase wallet"
            src={CoinbaseLogo}
            onClick={() => handleConnectCoinbase()}
          ></ConnectButton>
          <ConnectButton
            name="walletconnect"
            text="Wallet Connect"
            src={WalletConnectLogo}
            onClick={() => handleConnectWalletConnect()}
          ></ConnectButton>
        </VStack>
      </VStack>
    </VStack>
  );
};
