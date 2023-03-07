import { CheckIcon, ChevronDownIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  useContractFunction,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { BigNumber, utils } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import validator from "validator";
import {
  ModalApproval,
  ModalWhenMining,
  ModalWhenTxSuccess,
} from "../../../components/Modals";
import { ModalBuyToken } from "../../../components/Modals/ModalBuyToken";
import {
  AddressZero,
  CurrentNetworkType,
  TokenLogo,
  TokenSymbol,
  USDTLogo,
  useCurrentNetwork,
} from "../../../constants";
import { TokenName } from "../../../constants/Data";
import {
  usePresaleETH_USDPrice,
  usePresaleMinContribution,
  usePresaleTokenPrice,
} from "../../../hooks/presale";
import { useReferralUserAccount } from "../../../hooks/referral";
import { useAllowance } from "../../../hooks/utils";
import { CurrencyContainer } from "./CurrencyContainer";

export const SwapUI = () => {
  const { referrerAddress } = useParams();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const { account } = useEthers();
  const currentNetwork: CurrentNetworkType = useCurrentNetwork();

  const {
    isOpen: isOpenApprove,
    onOpen: onOpenApprove,
    onClose: onCloseApprove,
  } = useDisclosure();
  const {
    isOpen: isOpenSelectCoin,
    onOpen: onOpenSelectCoin,
    onClose: onCloseSelectCoin,
  } = useDisclosure();
  const {
    isOpen: isOpenModalBuyToken,
    onOpen: onOpenModalBuyToken,
    onClose: onCloseModalBuyToken,
  } = useDisclosure();

  const userETHBalance: BigNumber | undefined = useEtherBalance(account);
  const userUSDTBalance: BigNumber | undefined = useTokenBalance(
    currentNetwork?.USDAddress,
    account
  );
  const userTokenBalance: BigNumber | undefined = useTokenBalance(
    currentNetwork?.TokenAddress,
    account
  );

  const ethPrice: number = usePresaleETH_USDPrice();
  const token_Price: number = usePresaleTokenPrice();
  const minContributionPresale = usePresaleMinContribution();

  const hasReferrer = useReferralUserAccount(account)?.hasReferrer;

  const { state, send, resetState } = useContractFunction(
    currentNetwork?.PresaleInterface,
    "BuyWithETH"
  );
  const {
    state: stateUSDT,
    send: sendUSDT,
    resetState: resetStateUSD,
  } = useContractFunction(currentNetwork?.PresaleInterface, "BuyWithUSD");
  const [referInputValid, setReferInputValid] = useState(false);
  const [status, setStatus] = useState<
    "Mining" | "Loading" | "TxSuccess" | "No" | "Disabled"
  >("No");
  const [selectedCoin, setSelectedCoin] = useState({
    name: currentNetwork?.NetworkSymbol,
    logo: currentNetwork?.NetworkLogoURL,
  });

  const [userInput, setUserInput] = useState<{
    ethInput: string;
    tokenInput: string;
    referrerInput: string;
    stakingDuration: string;
  }>({
    ethInput: "",
    tokenInput: "",
    //@ts-ignore
    referrerInput: referrerAddress ?? "",
    stakingDuration: `${90 * 86400}`,
  });

  const coinPrice = (): number => {
    if (selectedCoin.name === "USDT") {
      return 1;
    }

    return ethPrice;
  };

  const minContribution = (): number => {
    if (selectedCoin.name === "USDT") {
      return minContributionPresale
        ? Number(minContributionPresale?.minContUSD)
        : 0;
    }

    return minContributionPresale
      ? Number(minContributionPresale?.minContETH)
      : 0;
  };

  const userBalance = (): number => {
    if (selectedCoin.name === "USDT") {
      return userUSDTBalance ? Number(formatUnits(userUSDTBalance, 6)) : 0;
    }

    return userETHBalance ? Number(formatEther(userETHBalance)) : 0;
  };

  const isUserHaveSufficintBalance = (): boolean => {
    if (userBalance() >= minContribution()) {
      return true;
    }

    return false;
  };

  const ethValueGreaterThenMinContribution = (): boolean => {
    if (Number(userInput.ethInput) >= minContribution()) {
      return true;
    }

    return false;
  };

  const userUSDAllowance: number | undefined = useAllowance(
    currentNetwork?.USDAddress,
    currentNetwork?.USDInterface,
    6,
    account,
    currentNetwork?.PresaleAddress
  );
  const handleUserInput = (e: any) => {
    if (e.target.name === "ethInput") {
      let tokenValue: number = e.target.value * coinPrice() * token_Price;
      setUserInput((prev) => ({
        ...prev,
        ethInput: e.target.value,
        tokenInput: tokenValue === 0 ? "" : tokenValue.toFixed(5),
      }));
    } else {
      let ethValue: number = e.target.value / coinPrice() / token_Price;
      setUserInput((prev) => ({
        ...prev,
        tokenInput: e.target.value,
        ethInput: ethValue === 0 ? "" : ethValue.toFixed(5),
      }));
    }
  };

  useEffect(() => {
    validator.isEthereumAddress(userInput.referrerInput)
      ? setReferInputValid(true)
      : setReferInputValid(false);
  }, [userInput.referrerInput]);

  const handleReferrerInput = (e) => {
    if (e.target.name === "referrerInput") {
      setUserInput((prev) => ({
        ...prev,
        referrerInput: e.target.value,
      }));
    } else if (e.target.name === "defaultReferrerButton") {
      setUserInput((prev) => ({
        ...prev,
        referrerInput: currentNetwork?.DefaultReferrer,
      }));
    } else if (e.target.name === "clearReferrerInput") {
      setUserInput((prev) => ({
        ...prev,
        referrerInput: "",
      }));
    }
  };

  const handleStakingDurationInput = (e: any) => {
    let stakingDurationSeconds = Number(e) * 86400;
    setUserInput((prev) => ({
      ...prev,
      stakingDuration: stakingDurationSeconds?.toString(),
    }));
  };

  const handleMinButton = (e: any) => {
    if (isUserHaveSufficintBalance()) {
      let MaxEth =
        (Number(userBalance() ?? 0) * Number(e.target.value)) / 100 - 0.003;
      let tokenValue: number = MaxEth * coinPrice() * token_Price;
      setUserInput((prev) => ({
        ...prev,
        ethInput: MaxEth.toFixed(5),
        tokenInput: tokenValue.toFixed(5),
      }));
    } else {
      toast({
        title: `Insufficient Balance`,
        description: `You atleast need $${minContribution} value of ${
          selectedCoin?.name
        }, or ${minContribution()} ${selectedCoin?.name}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const changeCoin = (e) => {
    setSelectedCoin({
      name: e.target.alt,
      logo: e.target.src,
    });

    onCloseSelectCoin();
    userInput.ethInput = "";
    userInput.tokenInput = "";
  };

  const proceedSwap = () => {
    if (!hasReferrer && userInput?.referrerInput.length === 0) {
      toast({
        title: `No Referrer Address.`,
        description: `Please add a valid referrer ETH Address or select default one.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else if (!hasReferrer && referInputValid === false) {
      toast({
        title: `Invalid Referrer Addresss`,
        description: `Please add a valid referrer ETH Address.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else if (!isUserHaveSufficintBalance()) {
      toast({
        title: `Insufficient Balance`,
        description: `You atleast need $${minContribution} value of ${
          selectedCoin?.name
        }, or ${minContribution()} ${selectedCoin?.name}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else if (!ethValueGreaterThenMinContribution()) {
      toast({
        title: `${selectedCoin.name} value is less then min buying value.`,
        description: `Please buy with atleast ${minContribution()} ${
          selectedCoin?.name
        }.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      onOpenModalBuyToken();
    }
  };

  const handleSwapTokens = async () => {
    setStatus("Loading");
    if (selectedCoin.name === "USDT") {
      if (hasReferrer) {
        await sendUSDT(
          currentNetwork?.DefaultReferrer,
          utils.parseUnits(userInput.ethInput, 6),
          userInput?.stakingDuration,
          {
            value: "0",
          }
        );
      } else {
        await sendUSDT(
          userInput.referrerInput,
          utils.parseUnits(userInput.ethInput, 6),
          userInput?.stakingDuration,
          {
            value: "0",
          }
        );
      }
    } else {
      if (hasReferrer) {
        await send(
          currentNetwork?.DefaultReferrer,
          userInput?.stakingDuration,
          {
            value: utils.parseEther(userInput.ethInput),
          }
        );
      } else {
        await send(userInput.referrerInput, userInput?.stakingDuration, {
          value: utils.parseEther(userInput.ethInput),
        });
      }
    }
    setStatus("No");
  };

  useEffect(() => {
    if (state.status === "Mining" || stateUSDT.status === "Mining") {
      setStatus("Mining");
    } else if (state.status === "Success" || stateUSDT.status === "Success") {
      try {
        resetState();
        resetStateUSD();
        setStatus("TxSuccess");
        setUserInput({
          ethInput: "",
          tokenInput: "",
          referrerInput: "",
          stakingDuration: `${90 * 86400}`,
        });
        setTimeout(() => {
          onCloseModalBuyToken();
          setStatus("No");
        }, 10000);
      } catch (err) {}
    }
  }, [state, stateUSDT]);

  const ModalChangeCoin = () => {
    return (
      <>
        <ModalHeader textAlign="center">
          Select coin to buy {TokenName}
        </ModalHeader>
        <ModalBody>
          <Wrap justify="center" spacing={10}>
            <VStack>
              <Image
                src={currentNetwork?.NetworkLogoURL}
                alt={currentNetwork?.NetworkSymbol}
                onClick={changeCoin}
                cursor="pointer"
                w="40px"
              ></Image>

              <Text fontSize="sm">{currentNetwork?.NetworkSymbol}</Text>
            </VStack>

            <VStack>
              <Image
                src={USDTLogo}
                alt="USDT"
                onClick={changeCoin}
                cursor="pointer"
                w="40px"
              ></Image>
              <Text fontSize="sm">USDT</Text>
            </VStack>
          </Wrap>
        </ModalBody>
      </>
    );
  };

  return (
    <>
      <VStack spacing={5} pt={100}>
        <Heading as="h2" fontSize="3xl">
          Swap {TokenSymbol}
        </Heading>
        <VStack
          w="300px"
          borderRadius="50px"
          bgColor={
            colorMode === "dark"
              ? "whiteAlpha.200"
              : !account
              ? "blue.100"
              : "blue.200"
          }
          spacing={5}
          p={5}
          justify="center"
          boxShadow="lg"
        >
          {!hasReferrer && (
            <CurrencyContainer>
              <Button
                borderRadius="xl"
                bgColor="#ff0080"
                color="white"
                isDisabled={!account}
              >
                Referrer Address
              </Button>
              <InputGroup>
                <InputRightElement
                  h="100%"
                  color={referInputValid ? "green.500" : "red.500"}
                  children={
                    referInputValid ? <CheckIcon /> : <SmallCloseIcon />
                  }
                ></InputRightElement>
                <Input
                  name="referrerInput"
                  placeholder="Please enter referrer address."
                  value={userInput.referrerInput}
                  onChange={handleReferrerInput}
                  isInvalid={referInputValid === false}
                  borderColor={referInputValid ? "green.500" : "red.500"}
                  focusBorderColor={referInputValid ? "green.500" : "red.500"}
                  borderRadius="xl"
                  fontSize="sm"
                  isDisabled={!account}
                ></Input>
              </InputGroup>
              {!referrerAddress && (
                <HStack>
                  <Button
                    name="clearReferrerInput"
                    size="sm"
                    borderRadius="xl"
                    colorScheme="red"
                    onClick={handleReferrerInput}
                    isDisabled={!account}
                  >
                    Clear
                  </Button>
                  <Button
                    name="defaultReferrerButton"
                    size="sm"
                    borderRadius="xl"
                    onClick={handleReferrerInput}
                    isDisabled={!account}
                  >
                    Set Default Referrer
                  </Button>
                </HStack>
              )}
            </CurrencyContainer>
          )}

          <CurrencyContainer>
            <HStack justify="space-between" w="full">
              <HStack cursor="pointer" onClick={onOpenSelectCoin}>
                <Image src={selectedCoin?.logo} boxSize={5}></Image>
                <Text fontSize="sm">{selectedCoin?.name}</Text>
                <ChevronDownIcon />
              </HStack>
              <HStack>
                <Text fontSize="x-small">Balance: </Text>
                <Text fontSize="x-small" fontWeight="bold">
                  {userBalance().toFixed(3) ?? <Spinner />}
                </Text>
              </HStack>
            </HStack>
            <Input
              name="ethInput"
              variant="unstyled"
              min={0}
              w="full"
              h="50px"
              placeholder="0.0"
              type="number"
              fontSize="xl"
              isDisabled={!account}
              value={userInput?.ethInput}
              onChange={handleUserInput}
            ></Input>
            <HStack>
              <Button
                size="sm"
                value={25}
                onClick={handleMinButton}
                borderRadius="xl"
                isDisabled={!account}
              >
                25%
              </Button>
              <Button
                size="sm"
                value={50}
                onClick={handleMinButton}
                borderRadius="xl"
                isDisabled={!account}
              >
                50%
              </Button>
              <Button
                size="sm"
                value={75}
                onClick={handleMinButton}
                borderRadius="xl"
                isDisabled={!account}
              >
                75%
              </Button>
              <Button
                size="sm"
                value={100}
                onClick={handleMinButton}
                borderRadius="xl"
                isDisabled={!account}
              >
                Max
              </Button>
            </HStack>
          </CurrencyContainer>
          <CurrencyContainer>
            <HStack justify="space-between" w="full">
              <HStack cursor="pointer">
                <Image src={TokenLogo} boxSize={5}></Image>
                <Text fontSize="sm">{TokenSymbol}</Text>
              </HStack>
              <HStack>
                <Text fontSize="x-small">Balance:</Text>
                <HStack fontSize="x-small" fontWeight="bold">
                  <Text>
                    {userTokenBalance
                      ? Number(formatEther(userTokenBalance)).toFixed(3)
                      : 0}
                  </Text>
                </HStack>
              </HStack>
            </HStack>
            <Input
              name="tokenInput"
              variant="unstyled"
              min={0}
              w="full"
              h="50px"
              placeholder="0.0"
              type="number"
              fontSize="xl"
              isDisabled={!account}
              value={userInput?.tokenInput}
              onChange={handleUserInput}
            ></Input>
            <Button
              py={2}
              fontSize="sm"
              borderRadius="xl"
              isDisabled={!account}
            >
              1 {selectedCoin?.name} = {(coinPrice() * token_Price).toFixed(2)}{" "}
              {TokenSymbol}
            </Button>
          </CurrencyContainer>
          <CurrencyContainer>
            <FormControl>
              <FormLabel>Select Staking Duration</FormLabel>
              <VStack py={2}>
                <RadioGroup
                  defaultValue="90"
                  onChange={handleStakingDurationInput}
                  isDisabled={!account}
                >
                  <HStack w="full" justify="space-between">
                    <VStack spacing={1}>
                      <Radio
                        value="90"
                        size="lg"
                        borderWidth={25}
                        _checked={{
                          borderColor: "#ff0080",
                        }}
                        _after={{
                          content: '"3"',
                        }}
                      ></Radio>
                      <VStack spacing={0}>
                        <Text fontSize="x-small">Months</Text>
                        <HStack spacing={1}>
                          <Text fontSize="x-small" color="#ff0080">
                            24%
                          </Text>
                          <Text fontSize="xx-small">APY</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                    <VStack spacing={1}>
                      <Radio
                        value="180"
                        size="lg"
                        borderWidth={25}
                        _checked={{
                          borderColor: "#ff0080",
                        }}
                        _after={{
                          content: '"6"',
                        }}
                      ></Radio>

                      <VStack spacing={0}>
                        <Text fontSize="x-small">Months</Text>
                        <HStack spacing={1}>
                          <Text fontSize="x-small" color="#ff0080">
                            36%
                          </Text>
                          <Text fontSize="xx-small">APY</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                    <VStack spacing={1}>
                      <Radio
                        value="365"
                        size="lg"
                        borderWidth={25}
                        _checked={{
                          borderColor: "#ff0080",
                        }}
                        _after={{
                          content: '"12"',
                        }}
                      ></Radio>
                      <VStack spacing={0}>
                        <Text fontSize="x-small">Months</Text>
                        <HStack spacing={1}>
                          <Text fontSize="x-small" color="#ff0080">
                            48%
                          </Text>
                          <Text fontSize="xx-small">APY</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                    <VStack spacing={1}>
                      <Radio
                        value="545"
                        size="lg"
                        borderWidth={25}
                        _checked={{
                          borderColor: "#ff0080",
                        }}
                        _after={{
                          content: '"18"',
                        }}
                      ></Radio>
                      <VStack spacing={0}>
                        <Text fontSize="x-small">Months</Text>
                        <HStack spacing={1}>
                          <Text fontSize="x-small" color="#ff0080">
                            60%
                          </Text>
                          <Text fontSize="xx-small">APY</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </HStack>
                </RadioGroup>
              </VStack>
            </FormControl>
          </CurrencyContainer>

          <Button
            w="full"
            h="75px"
            borderRadius="3xl"
            boxShadow="lg"
            bgColor="#ff0080"
            color="white"
            isDisabled={
              !account ||
              userInput.ethInput.length === 0 ||
              userInput.tokenInput.length === 0
            }
            _hover={{
              bgColor: colorMode === "light" ? "#ff0090" : "whiteAlpha.200",
            }}
            onClick={proceedSwap}
          >
            {account ? "Swap" : "Connect Wallet to Swap"}
          </Button>
        </VStack>
      </VStack>
      {/* Modals */}
      <Modal isOpen={isOpenApprove} onClose={onCloseApprove} isCentered={true}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <ModalContent borderRadius="3xl" borderWidth={5} margin={10}>
          <ModalCloseButton />
          <ModalApproval
            tokenLogo={selectedCoin?.logo}
            tokenName={selectedCoin?.name}
            tokenInterface={currentNetwork?.USDInterface}
            spenderAddress={currentNetwork?.PresaleAddress}
            tokenInput={userInput.ethInput}
          />
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenSelectCoin}
        onClose={onCloseSelectCoin}
        isCentered={true}
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <ModalContent borderRadius="3xl" borderWidth={5} margin={10}>
          <ModalCloseButton />
          <ModalChangeCoin />
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModalBuyToken}
        onClose={() => {
          onCloseModalBuyToken();
          setStatus("No");
        }}
        isCentered={true}
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <ModalContent borderRadius="3xl" borderWidth={5} margin={10}>
          <ModalCloseButton />
          {status === "TxSuccess" ? (
            <ModalWhenTxSuccess />
          ) : status === "Mining" ? (
            <ModalWhenMining />
          ) : // @ts-ignore
          userUSDAllowance < userInput.ethInput &&
            selectedCoin.name === "USDT" ? (
            <ModalApproval
              tokenLogo={selectedCoin?.logo}
              tokenName={selectedCoin?.name}
              tokenInterface={currentNetwork?.USDInterface}
              spenderAddress={currentNetwork?.PresaleAddress}
              tokenInput={userInput.ethInput}
            />
          ) : (
            <ModalBuyToken
              cancelButton={() => {
                onCloseModalBuyToken();
                setStatus("No");
              }}
              selectedCoinName={selectedCoin.name}
              selectedCoinImage={selectedCoin.logo}
              userInputETH={Number(userInput.ethInput)}
              userTokenInput={Number(userInput.tokenInput)}
              onClick={() => handleSwapTokens()}
              isLoading={status === "Loading"}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
