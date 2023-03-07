import { Text, TextProps } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { AddressZero } from "../../constants";
import { useFirebase } from "../../firebase/FirebaseContext";

export const ProfileNameComponent = ({
  address,
  style,
}: {
  address?: string;
  style?: TextProps;
}) => {
  const { account } = useEthers();
  const { getUserData, currentUser }: any | null = useFirebase();
  const [userData, setUserData] = useState<any | null>({});

  useEffect(() => {
    const data = () =>
      getUserData(undefined, address ?? account).then((data) => {
        setUserData(data);
      });
    return () => data();
  }, [address, account]);

  return (
    <Text {...style}>
      {address ? userData?.name : currentUser?.displayName ?? "Anonymous"}
    </Text>
  );
};
