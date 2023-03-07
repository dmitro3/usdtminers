import {
  Button,
  Heading,
  VStack,
  Icon,
  Center,
  Divider,
  HStack,
  Wrap,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { shortenAddress, useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import {
  FaArrowCircleDown,
  FaUser,
  FaUserAstronaut,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AddressZero } from "../../../constants";
import { useReferralUserAccount } from "../../../hooks/referral/useReferralUserAccount";
import { RefereeContainer } from "./RefereeContainer";

export const Team = () => {
  const { account } = useEthers();
  const [userAddress, setUserAddress] = useState(account);
  const userAccount = useReferralUserAccount(userAddress);

  return (
    <VStack w="full" minH="100vh" py={100} spacing={5}>
      <Button
        size="lg"
        color="#ff0080"
        fontSize="xl"
        fontWeight={700}
        borderRadius="xl"
        rightIcon={<FaUserShield />}
      >
        Your Team
      </Button>

      {userAccount?.referrerAddress !== AddressZero && (
        <>
          <Heading size="sm">Referrer Account</Heading>
          <RefereeContainer
            address={userAccount?.referrerAddress}
            icon={FaUserTie}
            onClick={() => setUserAddress(userAccount?.referrerAddress)}
          ></RefereeContainer>
          <Icon as={FaArrowCircleDown} w={8} h={8}></Icon>
        </>
      )}

      <Heading size="sm">User Account</Heading>
      <RefereeContainer
        address={userAddress}
        icon={FaUserAstronaut}
        onClick={() =>
          setUserAddress(
            userAccount?.hasReferrer
              ? userAccount?.referrerAddress
              : userAddress
          )
        }
      ></RefereeContainer>

      <Icon as={FaArrowCircleDown} w={8} h={8}></Icon>
      <Center w="90%" py={5}>
        <Divider />
      </Center>
      {userAccount ? (
        <Wrap spacing={5} w="full" justify="center" align="center">
          {userAccount?.hasReferee ? (
            userAccount?.referredAddresses.map((address) => {
              return (
                <RefereeContainer
                  address={address}
                  onClick={() =>
                    address !== AddressZero && setUserAddress(address)
                  }
                />
              );
            })
          ) : (
            <Heading size="md">You have no team</Heading>
          )}
        </Wrap>
      ) : (
        <Spinner />
      )}
    </VStack>
  );
};
