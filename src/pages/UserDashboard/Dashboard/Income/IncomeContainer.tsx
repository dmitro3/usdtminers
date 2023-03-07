import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

type IncomeProps = {
  currency: string;
  value: string | number;
  symbol: string | undefined;
  valueInUSD?: number | string;
  logo: string;
};

export const IncomeContainer = (props: IncomeProps) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Stat w="full">
        <StatLabel>Referral Income {props.currency}</StatLabel>
        <StatNumber>
          <HStack>
            <Heading size="md">
              {props.value} {props.symbol}
            </Heading>
          </HStack>
        </StatNumber>
        {props.valueInUSD && (
          <StatHelpText fontSize="xl">${props.valueInUSD}</StatHelpText>
        )}
      </Stat>
      <VStack spacing={0}>
        <Icon as={FaUsers} boxSize={8}></Icon>
        <ArrowDownIcon w={5} h={5}></ArrowDownIcon>
        <Image src={props.logo} boxSize={8}></Image>
      </VStack>
    </>
  );
};
