import {
  Avatar,
  Center,
  Divider,
  HStack,
  MenuDivider,
  MenuItem,
  Spacer,
  Text,
  useColorMode,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { ConnectButton } from "../ConnectButton";
import { MdDashboardCustomize } from "react-icons/md";
import { FaPiggyBank, FaUserCog, FaUsers } from "react-icons/fa";
import { TbArrowsDoubleSwNe } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { useEthers } from "@usedapp/core";

export const NavMenu = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { account } = useEthers();

  const MenuItemContainer = ({
    text,
    icon,
    onClick,
  }: {
    text: string;
    icon: IconType;
    onClick?: () => void;
  }) => {
    return (
      <MenuItem borderRadius="xl" fontSize="sm" onClick={onClick}>
        <HStack w="full">
          <Text>{text}</Text>
          <Spacer />
          <Icon as={icon} w={5} h={5} color="#ff0080"></Icon>
        </HStack>
      </MenuItem>
    );
  };
  return (
    <VStack>
      <MenuItemContainer
        icon={MdDashboardCustomize}
        text="Dashboard"
        onClick={() => navigate("user-dashboard")}
      ></MenuItemContainer>
      <MenuItemContainer
        icon={FaPiggyBank}
        text="Staking"
        onClick={() => navigate("user-dashboard/staking")}
      ></MenuItemContainer>
      <MenuItemContainer
        icon={FaUsers}
        text="Team"
        onClick={() => navigate(`user-dashboard/team/${account}`)}
      ></MenuItemContainer>
      {/* <MenuItemContainer
        icon={TbArrowsDoubleSwNe}
        text="Transactions"
      ></MenuItemContainer> */}
    </VStack>
  );
};
