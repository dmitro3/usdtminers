import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const Counter = ({
  timeinseconds,
  size = "md",
}: {
  timeinseconds: number | undefined;
  size?: "sm" | "md" | "lg" | "xl" | string;
}) => {
  const counterSize =
    size === "sm"
      ? "50px"
      : size === "md"
      ? "70px"
      : size === "lg"
      ? "90px"
      : size === "xl"
      ? "110px"
      : size;
  const counterFontSize =
    size === "sm"
      ? "lg"
      : size === "md"
      ? "2xl"
      : size === "lg"
      ? "4xl"
      : size === "xl"
      ? "5xl"
      : size;
  const timeFontSize =
    size === "sm"
      ? "small"
      : size === "md"
      ? "md"
      : size === "lg"
      ? "lg"
      : size === "xl"
      ? "xl"
      : size;
  const { colorMode } = useColorMode();
  const now = new Date().getTime();
  const nowSeconds = Math.round(now / 1000);
  const [SecondsCounter, setSecondsCounter] = useState(0);
  const [MinutesCounter, setMinutesCounter] = useState(0);
  const [HoursCounter, setHoursCounter] = useState(0);
  const [DaysCounter, setDaysCounter] = useState(0);

  const day = 24 * 60 * 60;
  const hour = 60 * 60;
  const minutes = 60;
  const seconds = 1000;

  const [stakingEndTime, setStakingEndTime] = useState(
    timeinseconds ?? nowSeconds
  );

  useEffect(() => {
    timeinseconds && setStakingEndTime(timeinseconds);
  }, [timeinseconds, stakingEndTime]);

  const remaingStakingSeconds = () => {
    const remainingStakingSeconds = stakingEndTime - nowSeconds;
    const RemainingDays = Math.floor(remainingStakingSeconds / day);
    const RemainingHours = Math.floor((remainingStakingSeconds % day) / hour);
    const RemainingMinutes = Math.floor(
      (remainingStakingSeconds % hour) / minutes
    );
    const RemainingSeconds = Math.floor(remainingStakingSeconds % minutes);

    setSecondsCounter((prev) => (RemainingSeconds < 0 ? 0 : RemainingSeconds));
    setMinutesCounter((prev) => (RemainingMinutes >= 0 ? RemainingMinutes : 0));
    setHoursCounter((prev) => (RemainingHours >= 0 ? RemainingHours : 0));
    setDaysCounter((prev) => (RemainingDays >= 0 ? RemainingDays : 0));
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      remaingStakingSeconds();
    }, 1000);

    return () => {
      clearInterval(clear);
    };
  }, [SecondsCounter, timeinseconds, stakingEndTime]);

  return (
    <HStack>
      <VStack>
        <VStack
          w={counterSize}
          h={counterSize}
          borderRadius={"25%"}
          fontSize={counterFontSize}
          fontWeight="bold"
          justify="center"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "#ff0080"}
          color="white"
          borderWidth="thick"
        >
          <Text>{DaysCounter}</Text>
        </VStack>
        <Text opacity="0.7" fontSize={timeFontSize}>
          Days
        </Text>
      </VStack>
      <VStack>
        <VStack
          w={counterSize}
          h={counterSize}
          borderRadius={"25%"}
          fontSize={counterFontSize}
          fontWeight="bold"
          justify="center"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "#ff0080"}
          color="white"
          borderWidth="thick"
        >
          <Text>{HoursCounter}</Text>
        </VStack>
        <Text opacity="0.7" fontSize={timeFontSize}>
          Hours
        </Text>
      </VStack>
      <VStack>
        <VStack
          w={counterSize}
          h={counterSize}
          borderRadius={"25%"}
          fontSize={counterFontSize}
          fontWeight="bold"
          justify="center"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "#ff0080"}
          color="white"
          borderWidth="thick"
        >
          <Text>{MinutesCounter}</Text>
        </VStack>
        <Text opacity="0.7" fontSize={timeFontSize}>
          Minutes
        </Text>
      </VStack>
      <VStack>
        <VStack
          w={counterSize}
          h={counterSize}
          borderRadius={"25%"}
          fontSize={counterFontSize}
          fontWeight="bold"
          justify="center"
          bgColor={colorMode === "dark" ? "blackAlpha.500" : "#ff0080"}
          color="white"
          borderWidth="thick"
        >
          <Text>{SecondsCounter}</Text>
        </VStack>
        <Text opacity="0.7" fontSize={timeFontSize}>
          Seconds
        </Text>
      </VStack>
    </HStack>
  );
};
