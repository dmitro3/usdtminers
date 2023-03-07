import { Button, Center, Heading, VStack, Wrap } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { FaChartLine } from "react-icons/fa";
import { SiHappycow } from "react-icons/si";
import { useGetUserStakingIDs } from "../../../hooks/staking/useGetUserStakingIDs";
import StakingInfoContainer from "./StakingInfoContainer";
import { StakingUI } from "./StakingUI";

export const StakingActive = () => {
  const { account } = useEthers();
  const userStakingIDs = useGetUserStakingIDs(account);

  return (
    <VStack justify="center" align="center" w="full" spacing={10} py={100}>
      <VStack spacing={10}>
        <Button
          size="lg"
          color="#ff0080"
          fontSize="xl"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<FaChartLine />}
        >
          Your Staking Stats
        </Button>
      </VStack>
      <Wrap w="95vw" justify="center">
        {userStakingIDs &&
          userStakingIDs.map((ids: BigNumber, key) => {
            return (
              <StakingInfoContainer
                address={account}
                stakingID={ids.toString()}
                key={key}
              ></StakingInfoContainer>
            );
          })}
      </Wrap>
      {/* <VStack>
        <Button
          size="lg"
          color="#ff0080"
          fontSize="xl"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<GiPayMoney />}
        >
          Pending Reward
        </Button>
        <Text fontSize="xl">0.000001 {TokenSymbol}</Text>
        <Button borderRadius="xl" colorScheme="red">
          Claim
        </Button>
      </VStack> */}
      <VStack spacing={5}>
        <Button
          size="lg"
          color="#ff0080"
          fontSize="xl"
          fontWeight={700}
          borderRadius="xl"
          rightIcon={<SiHappycow />}
        >
          Stake More
        </Button>
        <StakingUI />
      </VStack>
    </VStack>
  );
};
