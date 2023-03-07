import {
  useOutsideClick,
  Input,
  useToast,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { AddressZero } from "../../constants";
import { useFirebase } from "../../firebase/FirebaseContext";

export const ProfileUserNameComponent = ({
  address,
  style,
}: {
  address: string;
  style?: any;
}) => {
  const { getUserData } = useFirebase();
  const [userData, setUserData] = useState<DocumentData | null>();

  useEffect(() => {
    getUserData(undefined, address ?? AddressZero)?.then((data) =>
      setUserData(data)
    );
  }, [userData?.name, address]);

  return (
    <HStack spacing={0} fontSize="sm" w="full" {...style}>
      <Text color="#ff0080">@</Text>
      <Text>{userData?.userName ?? "username"}</Text>
    </HStack>
  );
};
