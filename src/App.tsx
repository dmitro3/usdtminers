import { VStack } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ScrollToTop } from "./navigation";

const App = (): JSX.Element => {
  return (
    <VStack w="full">
      <ScrollToTop />
      <Nav />;
      <Outlet />
      <Footer />
    </VStack>
  );
};

export default App;
