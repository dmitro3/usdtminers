import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Spacer,
  Switch,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TokenLogo, TokenSymbol } from "../../constants/Data";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { ConnectButton } from "../ConnectButton";
import { NavMenu } from "./NavMenu";

export const Nav = () => {
  const { active, account, deactivate } = useEthers();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const handleToggleSwitch = (e) => {
    console.log(e);
  };

  return (
    <HStack
      w="full"
      p="0.5"
      bgGradient="linear(to-r, blue, pink.500, yellow.500)"
      borderRadius="full"
      boxShadow="md"
      position="fixed"
      margin={2}
      zIndex={11111}
    >
      <HStack
        w="full"
        p={3}
        borderRadius="full"
        bgColor={colorMode === "dark" ? "gray.800" : "white"}
        spacing={5}
      >
        <HStack onClick={() => navigate("/")} cursor="pointer">
          <Center boxSize="40px">
            <Image src={TokenLogo} boxSize={10}></Image>
          </Center>
          <Center
            h="25px"
            // bgColor={colorMode === "dark" ? "gray.800" : "white"}
          >
            <Divider orientation="vertical"></Divider>
          </Center>
          <Text
            fontSize="xl"
            fontWeight={900}
            // color={colorMode === "dark" ? "gray.800" : "white"}
            bgGradient="linear(to-r, blue.500, pink.500, yellow.500)"
            bgClip="text"
          >
            MaticGold
          </Text>
        </HStack>
        <Spacer></Spacer>
        <ColorModeSwitcher w={5} h={5} />
        {/* <Show above="sm">
          <HStack>
            <InputGroup>
              <InputRightElement>
                <SearchIcon></SearchIcon>
              </InputRightElement>
              <Input borderRadius="xl" variant="outline"></Input>
            </InputGroup>
          </HStack>
        </Show> */}

        <HStack>
          {/* <HStack spacing={3}>
            <Icon as={FaTwitter} cursor="pointer" w={5} h={5}></Icon>
            <Icon as={FaGithub} cursor="pointer" w={5} h={5}></Icon>
            <Icon as={FaDiscord} cursor="pointer" w={5} h={5}></Icon>
            <ColorModeSwitcher w={5} h={5} />
          </HStack> */}
          <Show above="md">
            <ConnectButton borderRadius="xl" fontSize="sm"></ConnectButton>
          </Show>
          <Menu boundary="scrollParent">
            <MenuButton borderWidth="thin" w={10} h={10} borderRadius="xl">
              <Icon as={HamburgerIcon}></Icon>
            </MenuButton>
            <MenuList borderRadius="3xl" p={2}>
              <MenuItem borderRadius="2xl">
                <Center w="full">
                  <ConnectButton
                    fontSize="sm"
                    variant="ghost"
                    borderRadius="xl"
                  ></ConnectButton>
                </Center>
              </MenuItem>

              {account && (
                <Center py={5} w="full">
                  <NavMenu />
                </Center>
              )}

              <Center w="full" py={5}>
                <Divider></Divider>
              </Center>
              <MenuItem
                bgColor="#ff0080"
                borderRadius="xl"
                onClick={() => navigate("swap")}
              >
                <HStack w="full">
                  <Text color="white">Buy {TokenSymbol}</Text>
                  <Spacer></Spacer>
                  <Image
                    src={TokenLogo}
                    w={7}
                    h={7}
                    bgColor="white"
                    borderRadius="full"
                    p={1}
                  ></Image>
                </HStack>
              </MenuItem>

              <HStack p={2}>
                <Text fontSize="sm">
                  {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
                </Text>
                <Spacer />
                <Switch
                  isChecked={colorMode === "dark"}
                  onChange={toggleColorMode}
                  id="color-mode-changer"
                />
              </HStack>
              {account && (
                <MenuItem onClick={() => deactivate()}>
                  <HStack w="full">
                    <Text fontSize="sm">Sign Out</Text>
                    <Spacer />
                    <Icon as={FaSignOutAlt}></Icon>
                  </HStack>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </HStack>
  );
};
