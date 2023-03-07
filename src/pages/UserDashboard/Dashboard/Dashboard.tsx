import { Button, VStack } from "@chakra-ui/react";
import { MdDashboardCustomize } from "react-icons/md";
import { Business } from "./Business";
import { Income } from "./Income";
import { Staking } from "./Staking";
import { Team } from "./Team";
import { UserBalances } from "./UserBalances";

export const Dashboard = () => {
  return (
    <VStack w="full" minH="100vh" py={100} spacing={5}>
      <Button
        size="lg"
        color="#ff0080"
        fontSize="xl"
        fontWeight={700}
        borderRadius="xl"
        rightIcon={<MdDashboardCustomize />}
      >
        Your Dashboard Stats
      </Button>
      <UserBalances />
      <Staking />
      <Team />
      <Business />
      <Income />
    </VStack>
  );
};
