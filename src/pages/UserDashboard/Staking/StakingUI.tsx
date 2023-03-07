import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { MdGraphicEq } from "react-icons/md";
import {
  ModalApproval,
  ModalStakeTxSuccess,
  ModalWhenMining,
} from "../../../components/Modals";
import { ModalStakeToken } from "../../../components/Modals/ModalStakeTokens";
import {
  TokenDecimals,
  TokenLogo,
  TokenSymbol,
  useCurrentNetwork,
} from "../../../constants";
import { CurrentNetworkType } from "../../../constants/Data";
import { useGetMinStakingValue } from "../../../hooks/staking/useGetMinStakingValue";
import { useStakingCapping } from "../../../hooks/staking/useStakingCapping";
import { useAllowance } from "../../../hooks/utils";
import { useTokenBalance } from "../../../hooks/utils/useTokenBalance";

export const StakingUI = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { account } = useEthers();
  const currentNetwork: CurrentNetworkType = useCurrentNetwork();
  // @ts-ignore
  const userTokenBalance = useTokenBalance(account);
  const [userInput, setUserInput] = useState({
    tokenInput: "",
    stakingDuration: `${90 * 86400}`,
  });
  const userAllowance = useAllowance(
    currentNetwork?.TokenAddress,
    currentNetwork?.TokenInterface,
    TokenDecimals,
    account,
    currentNetwork?.StakingAddress
  );

  const stakingCapping = useStakingCapping();

  const {
    isOpen: isOpenApprove,
    onOpen: onOpenApprove,
    onClose: onCloseApprove,
  } = useDisclosure();

  const {
    isOpen: isOpenModalStakeToken,
    onOpen: onOpenModalStakeToken,
    onClose: onCloseModalStakeToken,
  } = useDisclosure();

  const {
    state: stateStake,
    send: sendStake,
    resetState,
  } = useContractFunction(currentNetwork?.StakingInterface, "stake");

  const [status, setStatus] = useState<
    "Mining" | "Loading" | "TxSuccess" | "No" | "Disabled" | "Error"
  >("No");

  const isUserHaveSufficintBalance = (): boolean => {
    if (userTokenBalance >= (stakingCapping?.minTokensToStake ?? 0)) {
      return true;
    }

    return false;
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      let tokenValue = (userTokenBalance * Number(e.target.value)) / 100;
      setUserInput((prev) => ({
        ...prev,
        tokenInput: tokenValue?.toString(),
      }));
    } else {
      toast({
        title: `Insufficient Balance`,
        description: `You atleast need ${
          stakingCapping?.minTokensToStake ?? 0
        } ${TokenSymbol} to stake.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const proceedStake = () => {
    onOpenModalStakeToken();
  };
  const handleStake = async () => {
    try {
      setStatus("Loading");
      await sendStake(
        parseEther(userInput?.tokenInput),
        userInput?.stakingDuration.toString(),
        {
          value: 0,
        }
      );
      setStatus("Loading");
    } catch (err) {
      setStatus("No");
    }
  };

  useEffect(() => {
    if (stateStake.status === "Mining") {
      setStatus("Mining");
    } else if (stateStake.status === "Success") {
      try {
        setStatus("TxSuccess");
        resetState();
        setTimeout(() => {
          setStatus("No");
          onCloseModalStakeToken();
          setUserInput((prev) => ({
            ...prev,
            tokenInput: "",
          }));
        }, 10000);
      } catch (err) {}
    }
  }, [stateStake]);

  return (
    <VStack
      w="300px"
      borderWidth="thin"
      borderRadius="40px"
      bgColor={colorMode === "dark" ? "blackAlpha.500" : "gray.200"}
      p={5}
    >
      <FormControl
        isInvalid={
          userInput?.tokenInput.length > 0
            ? !isUserHaveSufficintBalance() ||
              Number(userInput?.tokenInput) <
                (stakingCapping?.minTokensToStake ?? 0)
            : false
        }
      >
        <HStack align="center">
          <FormLabel>Amount</FormLabel>
          <Spacer />
          <Text fontSize="sm" textAlign="right">
            {userTokenBalance && userTokenBalance.toFixed(2)} {TokenSymbol}
          </Text>
        </HStack>
        <VStack>
          <Input
            name="tokenInput"
            size="lg"
            borderRadius="xl"
            borderColor="#ff0080"
            boxShadow="md"
            onChange={handleUserInput}
            value={userInput?.tokenInput}
          ></Input>
          <FormErrorMessage>
            Staking value must be greeate then{" "}
            {stakingCapping?.minTokensToStake ?? 0} {TokenSymbol}
          </FormErrorMessage>
          <FormHelperText>
            Please enter the {TokenSymbol} amount to stake.
          </FormHelperText>

          <HStack w="full" justify="space-between">
            <Button borderRadius="xl" value={25} onClick={handleMinButton}>
              25%
            </Button>
            <Button borderRadius="xl" value={50} onClick={handleMinButton}>
              50%
            </Button>
            <Button borderRadius="xl" value={75} onClick={handleMinButton}>
              75%
            </Button>
            <Button
              borderRadius="xl"
              colorScheme="pink"
              value={100}
              onClick={handleMinButton}
            >
              max
            </Button>
          </HStack>
        </VStack>
      </FormControl>
      {/* <Box p={2} borderWidth="thin" borderRadius="full">
        <Icon as={FaCalendarCheck} w={10} h={10} color="#ff0080"></Icon>
      </Box> */}
      <FormControl>
        <FormLabel>Staking Duration</FormLabel>
        <FormHelperText lineHeight={1}>
          Please select the duration of staking.
        </FormHelperText>
        <VStack py={2}>
          <RadioGroup defaultValue="90" onChange={handleStakingDurationInput}>
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
                      36%
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
                      90%
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
                      216%
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
                      378%
                    </Text>
                    <Text fontSize="xx-small">APY</Text>
                  </HStack>
                </VStack>
              </VStack>
            </HStack>
          </RadioGroup>
        </VStack>
      </FormControl>
      <HStack>
        <Button borderRadius="xl" size="lg" variant="outline">
          Clear
        </Button>
        <Button
          borderRadius="xl"
          size="lg"
          bgColor="#ff0080"
          color="white"
          isDisabled={
            !isUserHaveSufficintBalance() ||
            Number(userInput?.tokenInput) <
              (stakingCapping?.minTokensToStake ?? 0)
          }
          onClick={proceedStake}
        >
          Stake Now
        </Button>
      </HStack>
      <Modal isOpen={isOpenApprove} onClose={onCloseApprove} isCentered={true}>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <ModalContent borderRadius="3xl" borderWidth={5} margin={10}>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModalStakeToken}
        onClose={onCloseModalStakeToken}
        isCentered={true}
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
        <ModalContent borderRadius="3xl" borderWidth={5} margin={10}>
          {status === "TxSuccess" ? (
            <ModalStakeTxSuccess
              stakingValue={userInput?.tokenInput}
              stakingDuration={userInput?.stakingDuration}
            />
          ) : status === "Mining" ? (
            <ModalWhenMining />
          ) : // @ts-ignore
          userAllowance < Number(userInput.tokenInput) ? (
            <ModalApproval
              tokenLogo={TokenLogo}
              tokenName={TokenSymbol}
              tokenInterface={currentNetwork?.TokenInterface}
              spenderAddress={currentNetwork?.StakingAddress}
              tokenInput={userInput?.tokenInput}
            />
          ) : (
            <ModalStakeToken
              tokenLogo={TokenLogo}
              tokenSymbol={TokenSymbol}
              userTokenInput={userInput?.tokenInput}
              stakingDuration={userInput?.stakingDuration}
              cancelButton={onCloseModalStakeToken}
              onClick={() => {
                handleStake();
              }}
              isLoading={status === "Loading"}
            />
          )}
        </ModalContent>
      </Modal>
    </VStack>
  );
};
