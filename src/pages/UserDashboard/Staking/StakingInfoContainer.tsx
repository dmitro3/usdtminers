import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  HStack,
  keyframes,
  Text,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import { FaPiggyBank } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { HiClock } from "react-icons/hi";
import { Counter } from "../../../components/Counter";
import { TokenSymbol, useCurrentNetwork } from "../../../constants";
import { useGetStakingReward } from "../../../hooks/staking/useGetStakingReward";
import { useGetUserRewardClaimedByStakingID } from "../../../hooks/staking/useGetUserRewardClaimedByStakingID";
import { useGetUserStakingAPY } from "../../../hooks/staking/useGetUserStakingAPY";
import {
  userStakingByIDType,
  useUserStakingByID,
} from "../../../hooks/staking/useUserStakingByID";
import { Container } from "./Container";

const StakingAPYButtonKeyframe = keyframes`
 0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }`;

const StakingInfoContainer = ({
  address,
  stakingID,
}: {
  address: string | undefined;
  stakingID: string;
}): JSX.Element => {
  const StakingAPYButtonAnimation = `${StakingAPYButtonKeyframe} infinite 1s`;
  const toast = useToast();
  const { colorMode } = useColorMode();
  const currentNetwork = useCurrentNetwork();
  const userStakingAPY = useGetUserStakingAPY(address, stakingID);
  const userStakingReward = useGetStakingReward(address, stakingID);
  const userStakingByID: userStakingByIDType | undefined = useUserStakingByID(
    address,
    stakingID
  );

  const userRewardCliamedByStakingID = useGetUserRewardClaimedByStakingID(
    address,
    stakingID
  );

  const {
    state: stateUnStake,
    send: sendUnStake,
    resetState: resetStateUnStake,
  } = useContractFunction(currentNetwork?.StakingInterface, "unStake");

  const {
    state: stateClaimStakingReward,
    send: sendClaimStakingReward,
    resetState: resetStateClaimStakingReward,
  } = useContractFunction(
    currentNetwork?.StakingInterface,
    "claimStakingReward"
  );

  const [statusClaimReward, setStatusClaimReward] = useState<
    "Mining" | "Loading" | "TxSuccess" | "No" | "Disabled" | "Error"
  >("No");

  const [statusUnStake, setStatusUnStake] = useState<
    "Mining" | "Loading" | "TxSuccess" | "No" | "Disabled" | "Error"
  >("No");

  const handleUnStake = async () => {
    try {
      setStatusUnStake("Loading");
      await sendUnStake(stakingID, {
        value: 0,
      });
      setStatusUnStake("No");
    } catch (err) {
      setStatusUnStake("No");
    }
  };

  const handleClaimStakingReward = async () => {
    try {
      setStatusClaimReward("Loading");
      await sendClaimStakingReward(stakingID, {
        value: 0,
      });
      setStatusClaimReward("No");
    } catch (err) {
      setStatusClaimReward("No");
    }
  };

  useEffect(() => {
    if (stateUnStake.status === "Mining") {
      setStatusUnStake("Mining");
    } else if (stateUnStake.status === "Success") {
      try {
        setStatusUnStake("TxSuccess");
        resetStateUnStake();
        toast({
          title: "unStaked Successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          setStatusUnStake("No");
        }, 10000);
      } catch (err) {}
    }
  }, [stateUnStake]);

  useEffect(() => {
    if (stateClaimStakingReward.status === "Mining") {
      setStatusClaimReward("Mining");
    } else if (stateClaimStakingReward.status === "Success") {
      try {
        setStatusClaimReward("TxSuccess");
        resetStateClaimStakingReward();
        toast({
          title: "Reward Claimed Successfully",
          description: "",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          setStatusClaimReward("No");
        }, 10000);
      } catch (err) {}
    }
  }, [stateClaimStakingReward]);

  return (
    <Container>
      <HStack w="full">
        <Text fontSize="xl" fontWeight="bold" color="#ff0080">
          #{stakingID}
        </Text>
      </HStack>
      <HStack w="full" justify="center" py={3}>
        <Circle
          minW="70px"
          minH="70px"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "gray.200"}
          borderWidth="thin"
          // _before={{
          //   content: '""',
          //   borderRadius: "full",
          //   width: "125px",
          //   height: "125px",
          //   border: "2px solid #ff0080",
          //   position: "absolute",
          //   zIndex: 0,
          //   animation: StakingAPYButtonAnimation,
          // }}
          // _after={{
          //   content: '""',
          //   borderRadius: "full",
          //   width: "125px",
          //   height: "125px",
          //   border: "2px solid #ff0080",
          //   position: "absolute",
          //   zIndex: 0,
          //   animationDelay: "1s",
          //   animation: StakingAPYButtonAnimation,
          // }}
        >
          <VStack spacing={0}>
            <Heading color="#ff0080" size="sm">
              {userStakingAPY}%
            </Heading>
            <Heading size="xs">APY</Heading>
          </VStack>
        </Circle>
        <Center
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "gray.200"}
          borderWidth="thin"
          h={70}
          px={2}
          borderRadius="2xl"
        >
          <VStack spacing={0}>
            <Text fontSize="sm">Reward Claimed</Text>
            <Text fontSize="small">
              {userRewardCliamedByStakingID
                ? userRewardCliamedByStakingID.toFixed(7)
                : 0}
              {TokenSymbol}
            </Text>
          </VStack>
        </Center>
      </HStack>
      <VStack spacing={2}>
        <Button
          color="#ff0080"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<FaPiggyBank />}
        >
          Staking Value
        </Button>
        <Box
          p={2}
          borderWidth="thin"
          borderRadius="xl"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "white"}
        >
          <Text fontSize="md" fontWeight="bold">
            {userStakingByID && userStakingByID?.valueStaked.toFixed(2)}{" "}
            {TokenSymbol}
          </Text>
        </Box>
      </VStack>
      <VStack spacing={2}>
        <Button
          color="#ff0080"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<HiClock />}
        >
          Staking ends in
        </Button>
        <Box
          p={2}
          borderWidth="thin"
          borderRadius="3xl"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "white"}
        >
          <Counter timeinseconds={userStakingByID?.endTime} size="sm"></Counter>
        </Box>
      </VStack>
      <VStack spacing={2}>
        <Button
          color="#ff0080"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<GiPayMoney />}
        >
          Pending Reward
        </Button>
        <Box
          p={2}
          borderWidth="thin"
          borderRadius="xl"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "white"}
          w="full"
        >
          <Text fontSize="sm">
            {userStakingReward} {TokenSymbol}
          </Text>
        </Box>
        <HStack>
          <Button
            borderRadius="xl"
            color="#ff0080"
            fontSize="sm"
            onClick={handleClaimStakingReward}
            isLoading={
              statusClaimReward === "Loading" || statusClaimReward === "Mining"
            }
          >
            Claim
          </Button>
          <Button
            borderRadius="xl"
            colorScheme="red"
            fontSize="sm"
            onClick={handleUnStake}
            isLoading={
              statusUnStake === "Loading" || statusUnStake === "Mining"
            }
          >
            UnStake
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default StakingInfoContainer;
