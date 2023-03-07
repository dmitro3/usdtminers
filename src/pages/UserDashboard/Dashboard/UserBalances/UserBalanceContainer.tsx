import {
  Heading,
  HStack,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
} from "@chakra-ui/react";

type UserBalanceProps = {
  currency: string;
  balance: string | number;
  symbol: string | undefined;
  price?: number | string;
  logo: string;
};

export const UserBalanceContainer = (props: UserBalanceProps) => {
  const { colorMode } = useColorMode();
  return (
    <HStack
      p={5}
      borderWidth="thin"
      borderRadius="3xl"
      spacing={10}
      w="full"
      maxW={400}
      boxShadow="base"
      bgColor={colorMode === "dark" ? "blackAlpha.800" : "gray.100"}
    >
      <Stat w="full">
        <StatLabel>Your {props.currency} Balance</StatLabel>
        <StatNumber>
          <HStack>
            <Heading size="md">
              {props.balance} {props.symbol}
            </Heading>
          </HStack>
        </StatNumber>
        {props.price && (
          <StatHelpText fontSize="xl">${props.price}</StatHelpText>
        )}
      </Stat>
      <Image src={props.logo} boxSize={14}></Image>
    </HStack>
  );
};
