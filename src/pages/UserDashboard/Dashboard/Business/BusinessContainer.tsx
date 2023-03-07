import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Icon,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

type IncomeProps = {
  currency: string;
  value: string | number;
  symbol: string | undefined;
  valueInUSD?: number | string;
  logo: string;
};

export const BusinessContainer = (props: IncomeProps) => {
  return (
    <>
      <Stat w="full">
        <StatLabel>Total Business {props.currency}</StatLabel>
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
        <Icon as={BsCartCheckFill} boxSize={8}></Icon>
        <ArrowDownIcon w={5} h={5}></ArrowDownIcon>
        <Image src={props.logo} boxSize={8}></Image>
      </VStack>
    </>
  );
};
