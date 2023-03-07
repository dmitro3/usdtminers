import { VStack } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export const UserDashboard = () => {
  return (
    <VStack w="full" minH="100vh">
      <Outlet />;
    </VStack>
  );
};
