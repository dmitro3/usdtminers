import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Icon,
  IconProps,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

type TeamProps = {
  text: string;
  value: string | number;
  symbol?: string | undefined;
  valueInUSD?: number | string;
  icon: IconType;
};

export const TeamContainer = (props: TeamProps) => {
  return (
    <>
      <Stat w="full">
        <StatLabel>Team {props.text}</StatLabel>
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
        <Icon as={props.icon} boxSize={10}></Icon>
      </VStack>
    </>
  );
};
