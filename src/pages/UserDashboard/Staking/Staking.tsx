import { Center, Heading, VStack } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useIsStaked } from "../../../hooks/staking/useIsStaked";
import { StakingActive } from "./StakingActive";
import { StakingNotActive } from "./StakingNotActive";
import { StakingUI } from "./StakingUI";

export const Staking = () => {
  const { account } = useEthers();
  // @ts-ignore
  const isUserStaked = useIsStaked(account);
  return (
    <VStack w="full" minH="100vh">
      {isUserStaked ? <StakingActive /> : <StakingNotActive />}
    </VStack>
  );
};
