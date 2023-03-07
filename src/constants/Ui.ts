import { useMediaQuery } from "@chakra-ui/react";

export const useIsPC = () => {
  const [isPC] = useMediaQuery("(min-width: 1200px)");

  return isPC;
};

export const useIsLapy = () => {
  const isPC = useIsPC();
  let [isLapy] = useMediaQuery("(min-width: 700px)");
  isLapy = !isPC && isLapy;

  return isLapy;
};

export const useIsTablet = () => {
  const isLapy = useIsLapy();
  const isPC = useIsPC();
  let [isTablet] = useMediaQuery("(min-width: 500px)");
  isTablet = !isLapy && !isPC && isTablet;

  return isTablet;
};

export const useIsMobile = () => {
  const isTablet = useIsTablet();
  let [isMobile] = useMediaQuery("(max-width: 499.99px)");
  isMobile = !isTablet && isMobile;

  return isMobile;
};

export const Color = {};

export const Shadow = {
  lg: "drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.25))",
  md: "drop-shadow(0px 7px 3px rgba(0, 0, 0, 0.25))",
  sm: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25))",
  xs: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))",
  text: {
    lg: "drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.25))",
    md: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25))",
    sm: "drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.25))",
  },
  box: {
    lg: "drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.25))",
    md: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
    sm: "drop-shadow(0px 1px 2x rgba(0, 0, 0, 0.25))",
  },
};
