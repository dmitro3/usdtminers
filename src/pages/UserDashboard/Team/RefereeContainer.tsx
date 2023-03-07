import { CheckIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  VStack,
  Icon,
  Button,
  HStack,
  Center,
  Text,
  Spacer,
  IconButton,
  IconProps,
  Spinner,
  useClipboard,
} from "@chakra-ui/react";
import { shortenAddress } from "@usedapp/core";
import React from "react";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { useCurrentNetwork } from "../../../constants";
import { useReferralUserAccount } from "../../../hooks/referral";
import { useGetUserTotalRewardClaimed } from "../../../hooks/staking/useGetUserTotalRewardClaimed";
import { useGetUserTotalStakedValue } from "../../../hooks/staking/useGetUserTotalStakedValue";

export const RefereeContainer = ({
  address,
  icon,
  onClick,
}: {
  address: string | undefined;
  icon?: IconType;
  onClick?: () => void;
}) => {
  const userTotalStakedValue = useGetUserTotalStakedValue(address);
  const userAccount = useReferralUserAccount(address);
  const { value, onCopy, hasCopied } = useClipboard(address ?? "");
  const currentNetwork = useCurrentNetwork();
  return address ? (
    <VStack>
      <VStack
        p={5}
        borderRadius="3xl"
        borderWidth="thick"
        onClick={onClick}
        cursor="pointer"
      >
        <Icon as={icon ?? FaUser} w={10} h={10}></Icon>
      </VStack>
      <VStack p={5} borderRadius="3xl" borderWidth="thick" minW={150}>
        <HStack>
          <Button borderRadius="xl" size="lg">
            {shortenAddress(address)}
          </Button>
        </HStack>
        <HStack>
          <Text>Total Staked Value</Text>
          <Spacer />
          <Text>
            {userTotalStakedValue ? userTotalStakedValue.toFixed(3) : 0}
          </Text>
        </HStack>
        <HStack>
          <VStack>
            <Button size="lg" borderRadius="xl">
              {userAccount ? userAccount?.referredCount : 0}
            </Button>
            <Text>Referee</Text>
          </VStack>
          <VStack>
            <IconButton
              aria-label="View address in explorer"
              as="a"
              href={`${currentNetwork?.NetworkExplorerLink}/address/${address}`}
              target="_blank"
              icon={<ExternalLinkIcon />}
              size="lg"
              borderRadius="xl"
            ></IconButton>
            <Text>Explorer</Text>
          </VStack>
          <VStack>
            <IconButton
              aria-label="Copy Address Button"
              icon={
                hasCopied ? (
                  <CheckIcon color="teal.500"></CheckIcon>
                ) : (
                  <CopyIcon />
                )
              }
              size="lg"
              borderRadius="xl"
              onClick={onCopy}
            ></IconButton>
            <Text>Copy</Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  ) : (
    <Spinner />
  );
};
