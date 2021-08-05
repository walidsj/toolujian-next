import { useState } from "react";
import { Box, chakra, Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import ColorModeToggle from "../ui/colorModeToggle";
import HamburgerMenuToggle from "../ui/hamburgerMenuToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navBg = useColorModeValue("gray.200", "gray.700");
  const navColor = useColorModeValue("black", "white");

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        as="nav"
        display="flex"
        flexDir={{ base: "row-reverse", lg: "row" }}
        alignItems="center"
        fontWeight="500"
      >
        <HamburgerMenuToggle toggled={isOpen} toggle={setIsOpen} />
        <chakra.ul
          bg={{ base: navBg, lg: "transparent" }}
          color={navColor}
          display={{
            base: isOpen ? "block" : "none",
            lg: "flex",
          }}
          position={{ base: "absolute", lg: "static" }}
          top="6rem"
          left="5%"
          right="5%"
          rounded={{ base: "lg", lg: "none" }}
          py={{ base: "2", lg: "0" }}
          px={{ base: "4", lg: "0" }}
          alignItems={{ lg: "center" }}
          boxShadow={{ base: "xl", lg: "none" }}
          zIndex="2"
        >
          <chakra.li
            listStyleType="none"
            px={{ lg: "4" }}
            py={{ base: "3", lg: "0" }}
          >
            <NextLink href="/">
              <a onClick={closeMenu}>Home</a>
            </NextLink>
          </chakra.li>

          {/* <chakra.li
            listStyleType="none"
            px={{ lg: "4" }}
            py={{ base: "3", lg: "0" }}
          >
            <NextLink href="/about">
              <a onClick={closeMenu}>About</a>
            </NextLink>
          </chakra.li> */}
        </chakra.ul>

        <ColorModeToggle />
      </Box>
    </>
  );
}

export default Navbar;
