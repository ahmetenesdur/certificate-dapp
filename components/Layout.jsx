import React from "react";
import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorModeValue,
  useColorMode,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

import CertificationModal from "./CertificationModal";

const links = [
  { label: "My Certificates", to: "/mycertificates" },
  { label: "Coffees", to: "/coffees" },
];

const NavLink = ({ children, to }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={useColorModeValue("gray.800", "gray.200")}
    _hover={{
      textDecoration: "none",
      color: useColorModeValue("gray.600", "gray.400"),
    }}
    href={to}
  >
    {children}
  </Link>
);

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Box
      h="100vh"
      w="screen"
      position="relative"
      zIndex="0"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Box px={4} maxWidth={"5xl"} m={"auto"} mt={"5"}>
        <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href={"/"}>
                <Image
                  src={"/Certificate.svg"}
                  alt={"Certificate"}
                  width={"120"}
                  height={"120"}
                />
              </Link>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{
                base: "none",
                md: "flex",
              }}
            >
              {links.map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  {label}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex
            alignItems={"center"}
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <IconButton
              size={"md"}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label={"Toggle Color Mode"}
              onClick={toggleColorMode}
              mr={4}
            />

            {isConnected && (
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={onModalOpen}
              >
                Certifying
              </Button>
            )}

            {isConnected ? (
              <Button
                variant={"outline"}
                colorScheme={"blue"}
                size={"sm"}
                onClick={() => {
                  disconnect();
                }}
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Button>
            ) : (
              <Web3Button />
            )}
          </Flex>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {links.map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  {label}
                </NavLink>
              ))}
              <IconButton
                size={"md"}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                aria-label={"Toggle Color Mode"}
                onClick={toggleColorMode}
                mr={4}
              />

              {isConnected && (
                <Button
                  variant={"solid"}
                  colorScheme={"blue"}
                  size={"sm"}
                  mr={4}
                  leftIcon={<AddIcon />}
                  onClick={onModalOpen}
                >
                  Certifying
                </Button>
              )}

              {isConnected ? (
                <Button
                  variant={"outline"}
                  colorScheme={"blue"}
                  size={"sm"}
                  onClick={() => {
                    disconnect();
                  }}
                >
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </Button>
              ) : (
                //center the object
                <Box display="flex" justifyContent="center">
                  <Web3Button />
                </Box>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box px={4} maxWidth={"5xl"} m={"auto"} mt={"5"}>
        {children}
      </Box>

      <CertificationModal isOpen={isModalOpen} onClose={onModalClose} />
    </Box>
  );
};

export default Layout;
